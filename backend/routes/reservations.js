const express = require('express');
const router = express.Router();
const { getPool } = require('../config/db-multi');
const { executeQuery, getDbType } = require('../config/db-adapter');

// POST /api/reservations - Crear nueva reserva
router.post('/', async (req, res) => {
  try {
    const pool = getPool();
    const {
      id_cliente,
      cliente_nombre,
      cliente_apellido_paterno,
      cliente_apellido_materno,
      cliente_fecha_naci,
      id_hotel,
      id_habitacion,
      fecha_ini,
      fecha_fin,
      num_huespedes
    } = req.body;
    
    // Validar datos requeridos
    if (!id_hotel || !id_habitacion || !fecha_ini || !fecha_fin || !num_huespedes) {
      return res.status(400).json({
        success: false,
        error: 'Faltan datos requeridos de la reserva'
      });
    }
    
    // Validar que se proporcione id_cliente o datos del nuevo cliente
    if (!id_cliente && (!cliente_nombre || !cliente_apellido_paterno)) {
      return res.status(400).json({
        success: false,
        error: 'Debe proporcionar un ID de cliente existente o los datos para crear uno nuevo'
      });
    }
    
    // Crear reserva directamente (simplificado)
    const dbType = getDbType();
    let client;
    
    // Manejo de transacciones según el tipo de BD
    if (dbType === 'postgresql') {
      client = await pool.connect();
      await client.query('BEGIN');
    } else {
      // Para MySQL, SQL Server, Oracle - usar el pool directamente
      client = pool;
    }
    
    try {
      let clienteId = id_cliente;
      
      // Si no se proporciona id_cliente, crear uno nuevo
      if (!clienteId) {
        // Obtener el próximo ID de cliente
        const nextClienteIdResult = await executeQuery(client,
          'SELECT COALESCE(MAX(id_cliente), 0) + 1 as next_id FROM cliente'
        );
        const nextClienteId = nextClienteIdResult[0].next_id;
        
        // Insertar nuevo cliente
        const insertClienteResult = await executeQuery(client, `
          INSERT INTO cliente (
            id_cliente, nombre, apellido_paterno, apellido_materno, fecha_naci
          )
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id_cliente
        `, [
          nextClienteId, 
          cliente_nombre, 
          cliente_apellido_paterno, 
          cliente_apellido_materno || null,
          cliente_fecha_naci || null
        ]);
        
        clienteId = insertClienteResult[0].id_cliente;
      }
      
      // Calcular costo
      const costoQuery = await executeQuery(client,
        'SELECT calcular_costo_reserva($1, $2, $3::DATE, $4::DATE) as costo',
        [id_hotel, id_habitacion, fecha_ini, fecha_fin]
      );
      const costo = costoQuery[0].costo;
      
      // Obtener el próximo ID de reserva
      const nextIdResult = await executeQuery(client,
        'SELECT COALESCE(MAX(id_reserva), 0) + 1 as next_id FROM reserva'
      );
      const nextId = nextIdResult[0].next_id;
      
      // Insertar reserva
      const insertResult = await executeQuery(client, `
        INSERT INTO reserva (
          id_reserva, id_cliente, id_hotel, id_habitacion, 
          fecha_ini, fecha_fin, num_huespedes, costo, estado, fecha_reserva
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'Pendiente', CURRENT_DATE)
        RETURNING id_reserva
      `, [nextId, clienteId, id_hotel, id_habitacion, fecha_ini, fecha_fin, num_huespedes, costo]);
      
      // Obtener la reserva completa
      const reservaResult = await executeQuery(client, `
        SELECT 
          r.*,
          c.nombre as cliente_nombre,
          c.apellido_paterno as cliente_apellido,
          h.nombre as hotel_nombre, 
          hab.tipo as habitacion_tipo
        FROM reserva r
        JOIN cliente c ON r.id_cliente = c.id_cliente
        JOIN hotel h ON r.id_hotel = h.id_hotel
        JOIN habitacion hab ON r.id_hotel = hab.id_hotel AND r.id_habitacion = hab.id_habitacion
        WHERE r.id_reserva = $1
      `, [insertResult[0].id_reserva]);
      
      if (dbType === 'postgresql') {
        await client.query('COMMIT');
      }
      
      res.status(201).json({
        success: true,
        message: id_cliente ? 'Reserva creada exitosamente' : 'Cliente y reserva creados exitosamente',
        data: reservaResult[0],
        nuevo_cliente: !id_cliente
      });
    } catch (err) {
      if (dbType === 'postgresql' && client) {
        await client.query('ROLLBACK');
      }
      throw err;
    } finally {
      if (dbType === 'postgresql' && client) {
        client.release();
      }
    }
  } catch (error) {
    console.error('Error al crear reserva:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/reservations - Listar reservas
router.get('/', async (req, res) => {
  try {
    const pool = getPool();
    const { cliente_id, hotel_id, estado } = req.query;
    
    let query = `
      SELECT 
        r.*,
        c.nombre as cliente_nombre,
        c.apellido_paterno as cliente_apellido,
        h.nombre as hotel_nombre,
        hab.id_habitacion as num_habitacion,
        hab.tipo as habitacion_tipo
      FROM reserva r
      JOIN cliente c ON r.id_cliente = c.id_cliente
      JOIN hotel h ON r.id_hotel = h.id_hotel
      JOIN habitacion hab ON r.id_hotel = hab.id_hotel AND r.id_habitacion = hab.id_habitacion
      WHERE 1=1
    `;
    
    const params = [];
    let paramCount = 1;
    
    if (cliente_id) {
      query += ` AND r.id_cliente = $${paramCount}`;
      params.push(cliente_id);
      paramCount++;
    }
    
    if (hotel_id) {
      query += ` AND r.id_hotel = $${paramCount}`;
      params.push(hotel_id);
      paramCount++;
    }
    
    if (estado) {
      query += ` AND r.estado = $${paramCount}`;
      params.push(estado);
      paramCount++;
    }
    
    query += ' ORDER BY r.fecha_reserva DESC';
    
    const rows = await executeQuery(pool, query, params);
    
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener reservas'
    });
  }
});

// GET /api/reservations/:id - Obtener una reserva específica
router.get('/:id', async (req, res) => {
  try {
    const pool = getPool();
    const { id } = req.params;
    
    const rows = await executeQuery(pool, `
      SELECT 
        r.*,
        c.nombre as cliente_nombre,
        c.apellido_paterno as cliente_apellido,
        h.nombre as hotel_nombre,
        h.direccion as hotel_direccion,
        hab.id_habitacion as num_habitacion,
        hab.tipo as habitacion_tipo,
        hab.capacidad_personas as habitacion_capacidad
      FROM reserva r
      JOIN cliente c ON r.id_cliente = c.id_cliente
      JOIN hotel h ON r.id_hotel = h.id_hotel
      JOIN habitacion hab ON r.id_hotel = hab.id_hotel AND r.id_habitacion = hab.id_habitacion
      WHERE r.id_reserva = $1
    `, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Reserva no encontrada'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener reserva:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener reserva'
    });
  }
});

module.exports = router;

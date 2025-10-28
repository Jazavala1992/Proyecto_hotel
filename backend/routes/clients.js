const express = require('express');
const router = express.Router();
const { getPool } = require('../config/db-multi');
const { executeQuery } = require('../config/db-adapter');

// GET /api/clients/top/:hotelId - Cliente más recurrente de un hotel
router.get('/top/:hotelId', async (req, res) => {
  try {
    const pool = getPool();
    const { hotelId } = req.params;
    
    // Usar la función fn_cliente_mas_recurrente
    const rows = await executeQuery(pool, `
      SELECT * FROM fn_cliente_mas_recurrente($1)
    `, [hotelId]);
    
    if (rows.length === 0) {
      return res.json({
        success: true,
        data: null,
        message: 'No se encontraron reservas para este hotel'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener cliente recurrente:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/clients - Listar todos los clientes
router.get('/', async (req, res) => {
  try {
    const pool = getPool();
    const rows = await executeQuery(pool, `
      SELECT 
        c.id_cliente,
        c.nombre,
        c.apellido_paterno,
        c.apellido_materno,
        COUNT(r.id_reserva) as total_reservas
      FROM cliente c
      LEFT JOIN reserva r ON c.id_cliente = r.id_cliente
      GROUP BY c.id_cliente, c.nombre, c.apellido_paterno, c.apellido_materno
      ORDER BY total_reservas DESC, c.nombre
    `);
    
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener clientes'
    });
  }
});

module.exports = router;

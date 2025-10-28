const express = require('express');
const router = express.Router();
const { getPool } = require('../config/db-multi');
const { executeQuery } = require('../config/db-adapter');

// GET /api/payments/pending - Obtener pagos pendientes
router.get('/pending', async (req, res) => {
  try {
    const pool = getPool();
    const { hotelId } = req.query; // Filtro opcional por hotel
    
    let query = `
      SELECT 
        r.id_reserva,
        r.id_cliente,
        r.id_hotel,
        r.costo,
        r.estado,
        r.fecha_reserva,
        c.nombre,
        c.apellido_paterno,
        h.nombre as hotel_nombre,
        hab.id_habitacion as num_habitacion
      FROM reserva r
      JOIN cliente c ON r.id_cliente = c.id_cliente
      JOIN hotel h ON r.id_hotel = h.id_hotel
      JOIN habitacion hab ON r.id_hotel = hab.id_hotel AND r.id_habitacion = hab.id_habitacion
      WHERE r.estado = 'Pendiente'
    `;
    
    const params = [];
    
    // Agregar filtro por hotel si se proporciona
    if (hotelId) {
      query += ` AND r.id_hotel = $1`;
      params.push(hotelId);
    }
    
    query += ` ORDER BY r.fecha_reserva DESC`;
    
    const rows = await executeQuery(pool, query, params);
    
    // Calcular total
    const total = rows.reduce((sum, row) => sum + parseFloat(row.costo), 0);
    
    res.json({
      success: true,
      data: rows,
      summary: {
        total_pendientes: rows.length,
        monto_total: total
      }
    });
  } catch (error) {
    console.error('Error al obtener pagos pendientes:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener pagos pendientes'
    });
  }
});

// PATCH /api/payments/:reservaId/mark-paid - Marcar pago como completado
router.patch('/:reservaId/mark-paid', async (req, res) => {
  try {
    const pool = getPool();
    const { reservaId } = req.params;
    
    const rows = await executeQuery(pool, `
      UPDATE reserva
      SET estado = 'Confirmada'
      WHERE id_reserva = $1 AND estado = 'Pendiente'
      RETURNING *
    `, [reservaId]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Reserva no encontrada o ya está pagada'
      });
    }
    
    res.json({
      success: true,
      message: 'Pago registrado exitosamente',
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al marcar pago:', error);
    res.status(500).json({
      success: false,
      error: 'Error al marcar pago'
    });
  }
});

module.exports = router;

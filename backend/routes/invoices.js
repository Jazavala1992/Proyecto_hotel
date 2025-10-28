const express = require('express');
const router = express.Router();
const { getPool } = require('../config/db-multi');
const { executeQuery } = require('../config/db-adapter');

// GET /api/invoices/:reservaId - Generar factura de una reserva
router.get('/:reservaId', async (req, res) => {
  try {
    const pool = getPool();
    const { reservaId } = req.params;
    
    // Usar la función generar_factura
    const rows = await executeQuery(pool, `
      SELECT * FROM generar_factura($1)
    `, [reservaId]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Reserva no encontrada'
      });
    }
    
    // Obtener información adicional de la reserva
    const reservaInfo = await executeQuery(pool, `
      SELECT 
        r.*,
        c.nombre as cliente_nombre,
        c.apellido_paterno as cliente_apellido,
        h.nombre as hotel_nombre,
        h.direccion as hotel_direccion,
        hab.id_habitacion as num_habitacion,
        hab.tipo as habitacion_tipo
      FROM reserva r
      JOIN cliente c ON r.id_cliente = c.id_cliente
      JOIN hotel h ON r.id_hotel = h.id_hotel
      JOIN habitacion hab ON r.id_hotel = hab.id_hotel AND r.id_habitacion = hab.id_habitacion
      WHERE r.id_reserva = $1
    `, [reservaId]);
    
    res.json({
      success: true,
      data: {
        reserva: reservaInfo[0],
        factura: rows
      }
    });
  } catch (error) {
    console.error('Error al generar factura:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;

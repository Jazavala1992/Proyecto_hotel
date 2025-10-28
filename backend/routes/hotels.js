const express = require('express');
const router = express.Router();
const { getPool } = require('../config/db-multi');
const { executeQuery } = require('../config/db-adapter');

// GET /api/hotels - Listar todos los hoteles
router.get('/', async (req, res) => {
  try {
    const pool = getPool();
    const rows = await executeQuery(pool, `
      SELECT 
        h.id_hotel,
        h.nombre,
        h.direccion,
        h.ciudad,
        h.telefono,
        h.email,
        COUNT(DISTINCT hab.id_habitacion) as total_habitaciones,
        COUNT(DISTINCT CASE WHEN hab.estado = 'Disponible' THEN hab.id_habitacion END) as habitaciones_disponibles
      FROM hotel h
      LEFT JOIN habitacion hab ON h.id_hotel = hab.id_hotel
      GROUP BY h.id_hotel
      ORDER BY h.nombre
    `);
    
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener hoteles:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener hoteles'
    });
  }
});

// GET /api/hotels/:id - Obtener un hotel específico
router.get('/:id', async (req, res) => {
  try {
    const pool = getPool();
    const { id } = req.params;
    
    const rows = await executeQuery(pool, `
      SELECT 
        h.*,
        COUNT(DISTINCT hab.id_habitacion) as total_habitaciones
      FROM hotel h
      LEFT JOIN habitacion hab ON h.id_hotel = hab.id_hotel
      WHERE h.id_hotel = $1
      GROUP BY h.id_hotel
    `, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Hotel no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener hotel:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener hotel'
    });
  }
});

// GET /api/hotels/:id/rooms - Obtener habitaciones de un hotel
router.get('/:id/rooms', async (req, res) => {
  try {
    const pool = getPool();
    const { id } = req.params;
    
    // Verificar que el hotel existe
    const hotelCheck = await executeQuery(pool,
      'SELECT id_hotel FROM hotel WHERE id_hotel = $1',
      [id]
    );
    
    if (hotelCheck.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Hotel no encontrado'
      });
    }
    
    // Obtener habitaciones
    const rows = await executeQuery(pool, `
      SELECT 
        id_habitacion,
        tipo,
        capacidad_personas,
        precio_noche,
        estado
      FROM habitacion
      WHERE id_hotel = $1
      ORDER BY id_habitacion
    `, [id]);
    
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener habitaciones:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener habitaciones'
    });
  }
});

module.exports = router;

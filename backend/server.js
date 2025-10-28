const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar configuración multi-base de datos
const { initializePool, closePool, getDbType } = require('./config/db-multi');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Importar rutas
const hotelRoutes = require('./routes/hotels');
const clientRoutes = require('./routes/clients');
const reservationRoutes = require('./routes/reservations');
const paymentRoutes = require('./routes/payments');
const invoiceRoutes = require('./routes/invoices');

// Usar rutas
app.use('/api/hotels', hotelRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/invoices', invoiceRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: '🏨 API de Sistema de Gestión Hotelera',
    version: '2.0.0',
    database: getDbType().toUpperCase(),
    endpoints: {
      hotels: '/api/hotels',
      rooms: '/api/hotels/:id/rooms',
      topClient: '/api/clients/top/:hotelId',
      reservations: '/api/reservations',
      pendingPayments: '/api/payments/pending',
      invoice: '/api/invoices/:reservaId'
    }
  });
});

// Inicializar base de datos y arrancar servidor
async function startServer() {
  try {
    // Inicializar pool de conexiones
    await initializePool();
    console.log(`✅ Pool de ${getDbType().toUpperCase()} inicializado correctamente`);
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
      console.log(`📊 Base de datos activa: ${getDbType().toUpperCase()}`);
    });
  } catch (error) {
    console.error('❌ Error iniciando servidor:', error.message);
    process.exit(1);
  }
}

// Manejar cierre graceful
process.on('SIGTERM', async () => {
  console.log('⚠️  SIGTERM recibido, cerrando servidor...');
  await closePool();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('⚠️  SIGINT recibido, cerrando servidor...');
  await closePool();
  process.exit(0);
});

// Iniciar
startServer();

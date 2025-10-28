// ============================================
// CONFIGURACIÓN MULTI-BASE DE DATOS
// Conexión dinámica según DB_TYPE
// ============================================

const dbType = process.env.DB_TYPE || 'postgresql';

// ============================================
// POSTGRESQL (Configuración actual)
// ============================================

async function createPostgreSQLPool() {
  const { Pool } = require('pg');
  
  const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'hotel_db',
    user: process.env.DB_USER || 'admin_hotel',
    password: process.env.DB_PASSWORD || 'hotel123',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  // Test conexión
  try {
    const client = await pool.connect();
    client.release();
  } catch (err) {
    console.error('❌ Error conectando a PostgreSQL:', err.message);
    throw err;
  }

  return pool;
}

// ============================================
// MYSQL
// ============================================

async function createMySQLPool() {
  const mysql = require('mysql2/promise');
  
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || 'hotel_db',
    user: process.env.DB_USER || 'admin_hotel',
    password: process.env.DB_PASSWORD || 'hotel123',
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  });

  // Test conexión
  try {
    const connection = await pool.getConnection();
    connection.release();
  } catch (err) {
    console.error('❌ Error conectando a MySQL:', err.message);
    throw err;
  }

  return pool;
}

// ============================================
// SQL SERVER
// ============================================

async function createSQLServerPool() {
  const sql = require('mssql');
  
  const config = {
    server: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '1433'),
    database: process.env.DB_NAME || 'hotel_db',
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || 'YourStrong@Passw0rd',
    options: {
      encrypt: false, // Para Azure: true
      trustServerCertificate: true,
      enableArithAbort: true
    },
    pool: {
      max: 20,
      min: 0,
      idleTimeoutMillis: 30000
    }
  };

  // Test conexión
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (err) {
    console.error('❌ Error conectando a SQL Server:', err.message);
    throw err;
  }
}

// ============================================
// ORACLE
// ============================================

async function createOraclePool() {
  const oracledb = require('oracledb');
  
  try {
    const pool = await oracledb.createPool({
      user: process.env.DB_USER || 'admin_hotel',
      password: process.env.DB_PASSWORD || 'hotel123',
      connectString: `${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 1521}/${process.env.DB_NAME || 'XEPDB1'}`,
      poolMin: 2,
      poolMax: 20,
      poolIncrement: 2,
      poolTimeout: 60
    });

    return pool;
  } catch (err) {
    console.error('❌ Error conectando a Oracle:', err.message);
    throw err;
  }
}

// ============================================
// FACTORY: Crear pool según DB_TYPE
// ============================================

async function createDatabasePool() {
  switch (dbType) {
    case 'mysql':
      return await createMySQLPool();
    
    case 'mssql':
    case 'sqlserver':
      return await createSQLServerPool();
    
    case 'oracle':
      return await createOraclePool();
    
    case 'postgresql':
    case 'postgres':
    default:
      return await createPostgreSQLPool();
  }
}

// ============================================
// INICIALIZAR POOL GLOBAL
// ============================================

let pool = null;

async function initializePool() {
  if (!pool) {
    pool = await createDatabasePool();
  }
  return pool;
}

// ============================================
// OBTENER POOL
// ============================================

function getPool() {
  if (!pool) {
    throw new Error('❌ Pool no inicializado. Ejecuta initializePool() primero.');
  }
  return pool;
}

// ============================================
// CERRAR POOL
// ============================================

async function closePool() {
  if (pool) {
    switch (dbType) {
      case 'mysql':
        await pool.end();
        break;
      
      case 'mssql':
      case 'sqlserver':
        await pool.close();
        break;
      
      case 'oracle':
        await pool.close(0); // 0 = cierre inmediato
        break;
      
      case 'postgresql':
      case 'postgres':
      default:
        await pool.end();
        break;
    }
    
    pool = null;
  }
}

// ============================================
// EXPORTAR
// ============================================

module.exports = {
  initializePool,
  getPool,
  closePool,
  getDbType: () => dbType
};

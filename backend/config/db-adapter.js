// ============================================
// ADAPTADOR MULTI-BASE DE DATOS
// Soporta: PostgreSQL, MySQL, SQL Server, Oracle
// ============================================

const dbType = process.env.DB_TYPE || 'postgresql'; // postgresql | mysql | mssql | oracle

// ============================================
// FUNCIÓN: Convertir queries con parámetros
// ============================================

/**
 * Convierte sintaxis de parámetros según el tipo de BD
 * PostgreSQL: $1, $2, $3
 * MySQL: ?, ?, ?
 * SQL Server: @p1, @p2, @p3
 * Oracle: :1, :2, :3
 */
function convertQuery(query, params) {
  let convertedQuery = query;
  const convertedParams = [...params];

  switch (dbType) {
    case 'mysql':
      // Convertir $1, $2 → ?, ?
      let paramIndex = 1;
      convertedQuery = query.replace(/\$\d+/g, () => {
        return '?';
      });
      break;

    case 'mssql':
      // Convertir $1, $2 → @p1, @p2
      convertedQuery = query.replace(/\$(\d+)/g, (match, num) => {
        return `@p${num}`;
      });
      break;

    case 'oracle':
      // Convertir $1, $2 → :1, :2
      convertedQuery = query.replace(/\$(\d+)/g, (match, num) => {
        return `:${num}`;
      });
      break;

    case 'postgresql':
    default:
      // Ya está en formato PostgreSQL
      break;
  }

  return { query: convertedQuery, params: convertedParams };
}

// ============================================
// FUNCIÓN: Normalizar resultados
// ============================================

/**
 * Normaliza los resultados de diferentes bases de datos
 * PostgreSQL: result.rows
 * MySQL: result[0] (array directo)
 * SQL Server: result.recordset
 * Oracle: result.rows
 */
function normalizeResult(result) {
  switch (dbType) {
    case 'mysql':
      // MySQL devuelve [rows, fields]
      return Array.isArray(result) ? result[0] : result;

    case 'mssql':
      // SQL Server devuelve { recordset: [...] }
      return result.recordset || [];

    case 'oracle':
      // Oracle devuelve { rows: [...] }
      return result.rows || [];

    case 'postgresql':
    default:
      // PostgreSQL devuelve { rows: [...] }
      return result.rows || [];
  }
}

// ============================================
// FUNCIÓN: Ejecutar query
// ============================================

async function executeQuery(pool, query, params = []) {
  const { query: convertedQuery, params: convertedParams } = convertQuery(query, params);

  try {
    let result;

    switch (dbType) {
      case 'mysql':
        // MySQL usa execute para prepared statements
        [result] = await pool.execute(convertedQuery, convertedParams);
        break;

      case 'mssql':
        // SQL Server usa request
        const request = pool.request();
        convertedParams.forEach((param, index) => {
          request.input(`p${index + 1}`, param);
        });
        result = await request.query(convertedQuery);
        break;

      case 'oracle':
        // Oracle usa execute
        const connection = await pool.getConnection();
        try {
          result = await connection.execute(convertedQuery, convertedParams, {
            outFormat: 4001 // OBJECT format
          });
          await connection.commit();
        } finally {
          await connection.close();
        }
        break;

      case 'postgresql':
      default:
        // PostgreSQL usa query
        result = await pool.query(convertedQuery, convertedParams);
        break;
    }

    return normalizeResult(result);
  } catch (error) {
    console.error(`❌ Error ejecutando query en ${dbType}:`, error.message);
    throw error;
  }
}

// ============================================
// FUNCIÓN: Obtener tipo de BD
// ============================================

function getDbType() {
  return dbType;
}

// ============================================
// FUNCIÓN: Información del driver
// ============================================

function getDriverInfo() {
  const drivers = {
    postgresql: { package: 'pg', version: '8.11.3', port: 5432 },
    mysql: { package: 'mysql2', version: '3.6.0', port: 3306 },
    mssql: { package: 'mssql', version: '9.1.1', port: 1433 },
    oracle: { package: 'oracledb', version: '6.0.0', port: 1521 }
  };

  return drivers[dbType] || drivers.postgresql;
}

// ============================================
// FUNCIÓN: Traducir tipos de datos
// ============================================

/**
 * Traduce nombres de columnas según convenciones de cada BD
 */
function translateColumnName(columnName) {
  switch (dbType) {
    case 'oracle':
      // Oracle usa UPPER_CASE por defecto
      return columnName.toUpperCase();
    
    case 'postgresql':
    case 'mysql':
    case 'mssql':
    default:
      // Mantener lowercase
      return columnName.toLowerCase();
  }
}

// ============================================
// FUNCIÓN: Escapar identificadores
// ============================================

function escapeIdentifier(identifier) {
  switch (dbType) {
    case 'mysql':
      return `\`${identifier}\``;
    
    case 'mssql':
      return `[${identifier}]`;
    
    case 'postgresql':
      return `"${identifier}"`;
    
    case 'oracle':
      return `"${identifier.toUpperCase()}"`;
    
    default:
      return identifier;
  }
}

// ============================================
// EXPORTAR FUNCIONES
// ============================================

module.exports = {
  executeQuery,
  convertQuery,
  normalizeResult,
  getDbType,
  getDriverInfo,
  translateColumnName,
  escapeIdentifier
};

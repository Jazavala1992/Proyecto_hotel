# 🔄 SISTEMA MULTI-BASE DE DATOS
## Conectar a Múltiples Gestores sin Cambiar Código

Esta guía te muestra cómo **mantener tu PostgreSQL actual** y agregar la capacidad de **conectarte a otros gestores** (MySQL, SQL Server, Oracle) **cambiando solo una variable de entorno**.

---

## 📋 ¿Qué hemos creado?

### ✅ **Archivos nuevos:**

```
backend/
├── config/
│   ├── db.js              (Actual - PostgreSQL)
│   ├── db-multi.js        (NUEVO - Multi-gestor)
│   └── db-adapter.js      (NUEVO - Adaptador universal)
├── routes/
│   ├── hotels.js          (Actual - PostgreSQL)
│   └── hotels-multi.js    (NUEVO - Multi-gestor)
└── .env.example-multi     (NUEVO - Variables)
```

---

## 🎯 OPCIÓN 1: Mantener PostgreSQL y agregar MySQL

### **Paso 1: Instalar driver MySQL**

```bash
cd /Users/josezavala/proyecto-hotel/backend
npm install mysql2
```

### **Paso 2: Levantar MySQL en Docker**

Crea un archivo `docker-compose-mysql.yml`:

```yaml
version: '3.8'

services:
  mysql-hotel:
    image: mysql:8.0
    container_name: mysql-hotel
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: hotel_db
      MYSQL_USER: admin_hotel
      MYSQL_PASSWORD: hotel123
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./init-scripts-mysql:/docker-entrypoint-initdb.d
    networks:
      - hotel-network

volumes:
  mysql_data:

networks:
  hotel-network:
    driver: bridge
```

### **Paso 3: Levantar MySQL**

```bash
# Levantar MySQL (PostgreSQL sigue corriendo en puerto 5432)
docker-compose -f docker-compose-mysql.yml up -d

# Verificar que ambos están corriendo
docker ps
# Deberías ver:
# - postgres-hotel (puerto 5432)
# - mysql-hotel (puerto 3306)
```

### **Paso 4: Configurar variables de entorno**

Edita tu archivo `.env`:

```bash
# Para usar PostgreSQL (actual)
DB_TYPE=postgresql
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hotel_db
DB_USER=admin_hotel
DB_PASSWORD=hotel123

# Para usar MySQL (nuevo)
# DB_TYPE=mysql
# DB_HOST=localhost
# DB_PORT=3306
# DB_NAME=hotel_db
# DB_USER=admin_hotel
# DB_PASSWORD=hotel123
```

### **Paso 5: Modificar server.js**

Reemplaza la importación de `db.js` con `db-multi.js`:

```javascript
// ANTES:
// const pool = require('./config/db');

// AHORA:
const { initializePool, getPool, closePool } = require('./config/db-multi');

// Inicializar pool al arrancar
initializePool().then(() => {
  console.log('✅ Base de datos inicializada');
}).catch(err => {
  console.error('❌ Error inicializando BD:', err);
  process.exit(1);
});

// Cerrar pool al terminar
process.on('SIGTERM', async () => {
  await closePool();
  process.exit(0);
});
```

### **Paso 6: Actualizar una ruta (ejemplo)**

Reemplaza `routes/hotels.js` con el adaptador:

```javascript
// ANTES:
const pool = require('../config/db');
const result = await pool.query('SELECT * FROM hotel WHERE id_hotel = $1', [id]);
const hotels = result.rows;

// AHORA:
const { getPool } = require('../config/db-multi');
const { executeQuery } = require('../config/db-adapter');

const pool = getPool();
const hotels = await executeQuery(pool, 'SELECT * FROM hotel WHERE id_hotel = $1', [id]);
// ✅ executeQuery convierte automáticamente $1 según el gestor
```

### **Paso 7: Cambiar entre bases de datos**

```bash
# Cambiar a MySQL
echo "DB_TYPE=mysql" > .env
npm restart

# Cambiar de vuelta a PostgreSQL
echo "DB_TYPE=postgresql" > .env
npm restart
```

---

## 🔥 OPCIÓN 2: Conectar ambas simultáneamente

Si quieres **conectarte a PostgreSQL Y MySQL al mismo tiempo**:

### **Crear conexiones múltiples:**

```javascript
// backend/config/db-dual.js
const { Pool: PgPool } = require('pg');
const mysql = require('mysql2/promise');

// PostgreSQL
const pgPool = new PgPool({
  host: 'localhost',
  port: 5432,
  database: 'hotel_db',
  user: 'admin_hotel',
  password: 'hotel123'
});

// MySQL
const mysqlPool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'hotel_db',
  user: 'admin_hotel',
  password: 'hotel123'
});

module.exports = {
  pg: pgPool,
  mysql: mysqlPool
};
```

### **Usar en rutas:**

```javascript
const { pg, mysql } = require('../config/db-dual');

// Obtener de PostgreSQL
const pgResult = await pg.query('SELECT * FROM hotel');
const pgHotels = pgResult.rows;

// Obtener de MySQL
const [mysqlHotels] = await mysql.query('SELECT * FROM hotel');

// Comparar o combinar resultados
res.json({
  postgres: pgHotels,
  mysql: mysqlHotels
});
```

---

## 🎨 OPCIÓN 3: Selector dinámico por endpoint

Agregar un parámetro `?db=mysql` o `?db=postgresql`:

```javascript
router.get('/hotels', async (req, res) => {
  const dbType = req.query.db || 'postgresql'; // Default PostgreSQL
  
  let result;
  if (dbType === 'mysql') {
    const [rows] = await mysqlPool.query('SELECT * FROM hotel');
    result = rows;
  } else {
    const pgResult = await pgPool.query('SELECT * FROM hotel');
    result = pgResult.rows;
  }
  
  res.json({
    dbType: dbType,
    data: result
  });
});
```

Probar:
```bash
# Desde PostgreSQL
curl http://localhost:3001/api/hotels?db=postgresql

# Desde MySQL
curl http://localhost:3001/api/hotels?db=mysql
```

---

## 📊 Comparación de Opciones

| Opción | Complejidad | Uso | Ventaja |
|--------|-------------|-----|---------|
| **Opción 1** | 🟢 Baja | Una BD a la vez | Simple, cambio con `.env` |
| **Opción 2** | 🟡 Media | Ambas al mismo tiempo | Comparar datos, migración gradual |
| **Opción 3** | 🔴 Alta | Selector por request | Testing, fallback automático |

---

## 🚀 Ejemplo Práctico Completo

### **1. Instalar drivers**

```bash
cd backend
npm install mysql2 mssql oracledb
```

### **2. Levantar MySQL**

```bash
docker run -d \
  --name mysql-hotel \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=hotel_db \
  -e MYSQL_USER=admin_hotel \
  -e MYSQL_PASSWORD=hotel123 \
  -p 3306:3306 \
  mysql:8.0
```

### **3. Copiar estructura a MySQL**

```bash
# Conectar a MySQL
docker exec -it mysql-hotel mysql -u admin_hotel -photel123 hotel_db

# Ejecutar CREATE TABLEs (del archivo EJEMPLO_CONVERSION_MYSQL.sql)
```

### **4. Probar conexión**

```bash
# PostgreSQL (actual)
DB_TYPE=postgresql npm start
curl http://localhost:3001/api/hotels

# MySQL (nuevo)
DB_TYPE=mysql npm start
curl http://localhost:3001/api/hotels
```

---

## 🎯 Ventajas de este enfoque

✅ **Cero cambios en el frontend** - React sigue llamando a las mismas rutas  
✅ **Cambio instantáneo** - Solo cambias `DB_TYPE` en `.env`  
✅ **Código reutilizable** - El adaptador traduce queries automáticamente  
✅ **Mantenimiento simple** - Un solo lugar para cambiar lógica de BD  
✅ **Testing fácil** - Pruebas en múltiples gestores sin reescribir  

---

## 🔧 Troubleshooting

### **Error: Cannot find module 'mysql2'**

```bash
cd backend
npm install mysql2
```

### **Error: Connection refused (MySQL)**

```bash
# Verificar que MySQL está corriendo
docker ps | grep mysql

# Ver logs
docker logs mysql-hotel

# Reiniciar
docker restart mysql-hotel
```

### **Error: Queries fallan en MySQL**

El adaptador convierte `$1, $2` a `?, ?`, pero las **funciones de PostgreSQL** (como `fn_cliente_mas_recurrente`) **NO existen en MySQL**. Debes:

1. **Opción A**: Reescribir funciones en MySQL
2. **Opción B**: Usar procedimientos almacenados
3. **Opción C**: Mover lógica al backend (Node.js)

---

## 📝 Próximos Pasos

1. ✅ **Instalar driver deseado** (`mysql2`, `mssql`, `oracledb`)
2. ✅ **Levantar segundo gestor** (Docker o instalación local)
3. ✅ **Copiar estructura SQL** (tablas, índices)
4. ✅ **Cambiar `DB_TYPE` en `.env`**
5. ✅ **Reiniciar backend**
6. ✅ **Probar endpoints**

---

## 🎓 Conclusión

Ahora tienes **3 opciones** para trabajar con múltiples bases de datos:

1. **Cambiar entre gestores** con variable de entorno
2. **Usar ambos simultáneamente** con conexiones duales
3. **Selector por endpoint** con parámetro `?db=`

Tu **arquitectura actual se mantiene** - solo agregamos un **adaptador universal** que traduce sintaxis automáticamente. 🚀

¿Qué opción prefieres implementar?

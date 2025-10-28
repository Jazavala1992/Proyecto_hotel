# 🏨 Sistema de Gestión Hotelera v2.0# 🏨 Sistema de Gestión Hotelera v2.0# 🏨 Sistema de Gestión Hotelera# 🏨 Sistema de Gestión Hotelera# 🏨 Sistema de Gestión Hotelera# 🏨 Sistema de Gestión Hotelera



Sistema completo de gestión hotelera con **arquitectura multi-base de datos**. Soporta PostgreSQL, MySQL, SQL Server y Oracle.



---Sistema completo de gestión hotelera con **arquitectura multi-base de datos**, soporte para PostgreSQL, MySQL, SQL Server y Oracle.



## 🚀 Inicio Rápido



### 1. Levantar Base de Datos---Sistema de base de datos para gestión hotelera con soporte para PostgreSQL y Oracle.



```bash

docker-compose up -d postgres

```## 🚀 Inicio Rápido



### 2. Iniciar Backend



```bash### **1. Levantar Base de Datos (PostgreSQL)**## 📁 Estructura del ProyectoSistema de base de datos para gestión hotelera con soporte para PostgreSQL y Oracle.

cd backend

npm install

npm start

``````bash



### 3. Iniciar Frontenddocker-compose up -d postgres



```bash``````

cd frontend

npm install

npm start

```### **2. Iniciar Backend**proyecto-hotel/



### 4. Acceder



- **Frontend**: http://localhost:3000```bash├── docker-compose.yml          # Contenedores PostgreSQL y Oracle## 📁 Estructura del ProyectoSistema de base de datos para gestión hotelera con soporte para PostgreSQL y Oracle.Sistema de base de datos para gestión hotelera con soporte para PostgreSQL y Oracle.

- **Backend API**: http://localhost:3001

- **PostgreSQL**: localhost:5432cd backend



## 📊 Tecnologíasnpm start



- **Backend**: Node.js + Express 4.18.2```├── benchmark.py                # Script de benchmark (PostgreSQL)

- **Frontend**: React 18.2.0  

- **Base de Datos**: PostgreSQL 15 (soporta MySQL, SQL Server, Oracle)

- **Adaptador**: Convierte queries automáticamente entre gestores

### **3. Iniciar Frontend**├── README.md                   # Este archivo

---



## 🗂️ Estructura

```bash└── init-scripts/              # Scripts de inicialización PostgreSQL```

```

proyecto-hotel/cd frontend

├── backend/

│   ├── config/npm install    ├── create-tables.sql

│   │   ├── db-multi.js        # Factory de conexiones

│   │   └── db-adapter.js      # Adaptador universalnpm start

│   ├── routes/

│   │   ├── hotels.js```    └── insert-data.sqlproyecto-hotel/

│   │   ├── clients.js

│   │   ├── reservations.js

│   │   ├── payments.js

│   │   └── invoices.js### **4. Acceder al Sistema**```

│   ├── server.js

│   └── .env

│

├── frontend/- **Frontend**: http://localhost:3000├── docker-compose.yml          # Contenedores PostgreSQL y Oracle## 📁 Estructura del Proyecto## 📁 Estructura del Proyecto

│   ├── src/

│   │   ├── components/- **Backend API**: http://localhost:3001

│   │   │   ├── HotelList.js

│   │   │   ├── HotelRooms.js- **PostgreSQL**: localhost:5432## 🚀 Inicio Rápido

│   │   │   ├── TopClient.js

│   │   │   ├── ReservationForm.js

│   │   │   ├── PendingPayments.js

│   │   │   └── InvoiceGenerator.js---├── helper.sh                   # Script interactivo de ayuda

│   │   ├── api.js

│   │   └── App.js

│   └── package.json

│## 📊 Tecnologías### Opción 1: Usar el Helper Script (Recomendado)

├── init-scripts/

│   ├── 01-create-tables.sql

│   ├── 02-insert-data.sql

│   ├── 03-functions.sql### **Backend**├── benchmark.py                # Script de benchmark (PostgreSQL)

│   ├── 04-procedures.sql

│   ├── 05-triggers.sql- Node.js + Express 4.18.2

│   └── 06-funcionalidades-adicionales.sql

│- Adaptador multi-base de datos```bash

├── docs/

│   ├── GUIA_MIGRACION_BASES_DATOS.md- REST API con 11 endpoints

│   └── GUIA_MULTI_BASE_DATOS.md

│- Soporte para PostgreSQL, MySQL, SQL Server, Oracle./helper.sh├── init-scripts/              # Scripts de inicialización PostgreSQL

├── docker-compose.yml

└── README.md

```

### **Frontend**```

---

- React 18.2.0

## 📡 API Endpoints

- Axios para API calls│   ├── create-tables.sql``````

### Hoteles

- `GET /api/hotels` - Listar todos- 6 componentes principales

- `GET /api/hotels/:id` - Obtener uno

- `GET /api/hotels/:id/rooms` - HabitacionesEste script interactivo te permite:



### Clientes### **Base de Datos**

- `GET /api/clients` - Listar todos

- `GET /api/clients/top/:hotelId` - Cliente más recurrente- PostgreSQL 15 (por defecto)- 🚀 Levantar/detener contenedores│   └── insert-data.sql



### Reservas- Funciones PL/pgSQL

- `GET /api/reservations` - Listar (con filtros)

- `GET /api/reservations/:id` - Obtener una- Procedimientos almacenados- 🔌 Conectar a PostgreSQL o Oracle

- `POST /api/reservations` - Crear (auto-crea cliente)

- Triggers automáticos

### Pagos

- `GET /api/payments/pending` - Pendientes- Cursores explícitos- 📊 Ejecutar benchmark de PostgreSQL└── benchmark/                 # Scripts de benchmark y pruebasproyecto-hotel/proyecto-hotel/

- `GET /api/payments/pending?hotelId=X` - Filtrar por hotel

- `PATCH /api/payments/:id/mark-paid` - Marcar pagado



### Facturas---- 📈 Ver estadísticas en tiempo real

- `GET /api/invoices/:reservaId` - Generar factura



---

## 🗂️ Estructura del Proyecto- 🗂️ Ver logs    ├── 01_generar_datos_masivos_postgres_OPTIMIZADO.sql

## 🗄️ Funcionalidades SQL



### 1. Cliente Más Recurrente

```sql```

SELECT * FROM fn_cliente_mas_recurrente(1);

```proyecto-hotel/



### 2. Calcular Costo├── backend/                    # API Node.js + Express### Opción 2: Manual    ├── 02_generar_datos_masivos_oracle_OPTIMIZADO.sql├── docker-compose.yml          # Contenedores PostgreSQL y Oracle├── docker-compose.yml          # Contenedores PostgreSQL y Oracle

```sql

SELECT calcular_costo_reserva(1, 101, '2024-01-15', '2024-01-20');│   ├── config/

```

│   │   ├── db-multi.js        # Factory de conexiones multi-BD

### 3. Consultar Habitaciones

```sql│   │   └── db-adapter.js      # Adaptador universal de queries

CALL sp_consultar_habitaciones_hotel(1, 'Disponible', NULL, NULL);

```│   ├── routes/**1. Levantar Bases de Datos**    ├── 05_benchmark_postgres.sql



### 4. Generar Factura (con cursor)│   │   ├── hotels.js          # Endpoints de hoteles

```sql

SELECT * FROM generar_factura(1);│   │   ├── clients.js         # Endpoints de clientes

```

│   │   ├── reservations.js    # Endpoints de reservas

### 5. Trigger Automático

- Actualiza estado de habitación al crear/cancelar reserva│   │   ├── payments.js        # Endpoints de pagos```bash    ├── 06_benchmark_oracle.sql├── benchmark.py                # Script de benchmark (PostgreSQL)├── benchmark.py                # Script de benchmark (PostgreSQL)



---│   │   └── invoices.js        # Endpoints de facturas



## 🔄 Cambiar Base de Datos│   ├── server.js              # Servidor principaldocker-compose up -d



### PostgreSQL → MySQL│   ├── package.json



```bash│   └── .env                   # Configuración (DB_TYPE, credenciales)```    └── metricas.sql

# 1. Instalar driver

cd backend && npm install mysql2│



# 2. Levantar MySQL├── frontend/                   # Aplicación React

docker run -d --name mysql-hotel \

  -e MYSQL_DATABASE=hotel_db \│   ├── src/

  -e MYSQL_USER=admin_hotel \

  -e MYSQL_PASSWORD=hotel123 \│   │   ├── components/Esto crea:```├── init-scripts/              # Scripts de inicialización PostgreSQL├── init-scripts/              # Scripts de inicialización PostgreSQL

  -p 3306:3306 mysql:8.0

│   │   │   ├── HotelList.js         # Lista de hoteles

# 3. Editar .env

DB_TYPE=mysql│   │   │   ├── RoomSearch.js        # Búsqueda de habitaciones- **PostgreSQL**: `localhost:5432` - Usuario: `admin_hotel` / Password: `hotel123`

DB_PORT=3306

│   │   │   ├── TopClient.js         # Cliente más recurrente

# 4. Reiniciar

npm restart│   │   │   ├── ReservationForm.js   # Nueva reserva + tabla dinámica- **Oracle 23c Free**: `localhost:1521` - Usuario: `hotel_user` / Password: `hotel123`

```

│   │   │   ├── PendingPayments.js   # Pagos pendientes con filtro

Consulta `docs/GUIA_MIGRACION_BASES_DATOS.md` para conversión completa de scripts SQL.

│   │   │   └── InvoiceGenerator.js  # Generador de facturas

---

│   │   ├── api.js             # Cliente Axios

## ⚙️ Configuración (.env)

│   │   └── App.js             # Componente principal**2. Ejecutar Benchmark de PostgreSQL**## 🚀 Inicio Rápido│   ├── create-tables.sql│   ├── create-tables.sql

```bash

# Base de datos│   └── package.json

DB_TYPE=postgresql  # postgresql | mysql | mssql | oracle

DB_HOST=localhost│

DB_PORT=5432        # 5432 PG, 3306 MySQL, 1433 SQL Server, 1521 Oracle

DB_NAME=hotel_db├── init-scripts/               # Scripts SQL de inicialización

DB_USER=admin_hotel

DB_PASSWORD=hotel123│   ├── 01-create-tables.sql   # Creación de tablas```bash



# Servidor│   ├── 02-insert-data.sql     # Datos de prueba (50 clientes, 10 hoteles)

PORT=3001

```│   ├── 03-functions.sql       # Funciones (fn_cliente_mas_recurrente, calcular_costo)python3 benchmark.py



---│   ├── 04-procedures.sql      # Procedimientos (sp_consultar_habitaciones)



## 🧪 Testing│   ├── 05-triggers.sql        # Triggers (actualizar estado habitación)```### Opción 1: Usar el Helper Script (Recomendado)│   └── insert-data.sql│   └── insert-data.sql



```bash│   └── 06-funcionalidades-adicionales.sql  # generar_factura con cursor

# Verificar servidor

curl http://localhost:3001/│



# Listar hoteles├── docker-compose.yml          # PostgreSQL en Docker

curl http://localhost:3001/api/hotels

├── README.md                   # Este archivoEsto:

# Habitaciones disponibles

curl http://localhost:3001/api/hotels/1/rooms├── GUIA_MIGRACION_BASES_DATOS.md  # Guía para migrar a MySQL/Oracle/SQL Server



# Cliente recurrente└── GUIA_MULTI_BASE_DATOS.md   # Opciones de conexión simultánea- Genera 1.4 millones de registros (100K clientes, 1K hoteles, 50K habitaciones, 500K reservas, 500K registros, 250K destrozos)

curl http://localhost:3001/api/clients/top/1

```

# Pagos pendientes

curl http://localhost:3001/api/payments/pending- Ejecuta 5 queries de prueba```bash├── init-scripts-oracle/       # Scripts de inicialización Oracle├── init-scripts-oracle/       # Scripts de inicialización Oracle



# Generar factura---

curl http://localhost:3001/api/invoices/1

```- Muestra métricas de rendimiento (tiempo, CPU, memoria, cache)



---## 📡 API Endpoints



## 📊 Datos de Prueba./helper.sh



- 50 clientes bolivianos### **Hoteles**

- 10 hoteles

- 277 habitaciones- `GET /api/hotels` - Listar todos los hoteles**Tiempo estimado**: ~15 segundos para todo el proceso

- 64 reservas

- Precios: Bs. 120 - Bs. 350/noche- `GET /api/hotels/:id` - Obtener hotel específico



---- `GET /api/hotels/:id/rooms` - Habitaciones de un hotel```│   ├── create-tables.sql│   ├── create-tables.sql



## 🎯 Características



### Frontend### **Clientes**## 📊 Esquema de la Base de Datos

✅ Lista de hoteles con estadísticas  

✅ Búsqueda de habitaciones  - `GET /api/clients` - Listar todos los clientes

✅ Cliente más recurrente  

✅ Creación de reservas + auto-cliente  - `GET /api/clients/top/:hotelId` - Cliente más recurrente de un hotel

✅ Tabla dinámica de habitaciones  

✅ Filtro de pagos por hotel  

✅ Generación de facturas  

### **Reservas**### Tablas Principales

### Backend

✅ Arquitectura multi-BD  - `GET /api/reservations` - Listar reservas (filtros opcionales)

✅ Adaptador universal  

✅ Transacciones con rollback  - `GET /api/reservations/:id` - Obtener reserva específicaEste script interactivo te permite:│   └── insert-data.sql│   └── insert-data.sql

✅ 11 endpoints REST  

- `POST /api/reservations` - Crear nueva reserva (con auto-creación de cliente)

### Base de Datos

✅ 6 tablas relacionadas  1. **CLIENTE** - Información de clientes

✅ 3 funciones PL/pgSQL  

✅ 1 procedimiento almacenado  ### **Pagos**

✅ 2 triggers automáticos  

✅ 1 cursor explícito  - `GET /api/payments/pending` - Listar pagos pendientes2. **HOTEL** - Datos de hoteles- 🚀 Levantar/detener contenedores



---- `GET /api/payments/pending?hotelId=X` - Filtrar por hotel



## 🐳 Docker- `PATCH /api/payments/:reservaId/mark-paid` - Marcar como pagado3. **HABITACION** - Habitaciones por hotel (PK compuesta: id_hotel, id_habitacion)



```bash

# Levantar

docker-compose up -d postgres### **Facturas**4. **RESERVA** - Reservaciones de habitaciones- 🔌 Conectar a PostgreSQL o Oracle└── benchmark/                 # Scripts de benchmark y pruebas└── benchmark/                 # Scripts de benchmark y pruebas



# Logs- `GET /api/invoices/:reservaId` - Generar factura de una reserva

docker logs postgres-hotel

5. **REGISTRO** - Check-in/check-out

# Conectar

docker exec -it postgres-hotel psql -U admin_hotel -d hotel_db---



# Detener6. **DESTROZO** - Daños reportados- 📊 Ejecutar benchmarks

docker-compose down

## 🗄️ Base de Datos

# Reset completo

docker-compose down -v

```

### **Esquema Principal**

---

### Relaciones Clave- 📈 Ver estadísticas en tiempo real    ├── 01_generar_datos_masivos_postgres_OPTIMIZADO.sql    ├── 01_generar_datos_masivos_postgres_OPTIMIZADO.sql

## 📚 Documentación

```sql

| Archivo | Descripción |

|---------|-------------|CLIENTE (id_cliente, nombre, apellido_paterno, apellido_materno, fecha_naci)

| `docs/GUIA_MIGRACION_BASES_DATOS.md` | Migración a MySQL/SQL Server/Oracle |

| `docs/GUIA_MULTI_BASE_DATOS.md` | Conexión simultánea a múltiples BDs |HOTEL (id_hotel, nombre, direccion, ciudad, pais, telefono, email, categoria)



---HABITACION (id_hotel, id_habitacion, tipo, capacidad_personas, precio_noche, estado)- `HABITACION` tiene PK compuesta: `(id_hotel, id_habitacion)`- 🗂️ Ver logs



## 🔧 TroubleshootingRESERVA (id_reserva, fecha_reserva, fecha_ini, fecha_fin, num_huespedes, costo, estado, id_cliente, id_habitacion, id_hotel)



### Puerto ocupadoREGISTRO (id_registro, id_reserva, fecha_checkin, hora_checkin, fecha_checkout, hora_checkout)- `RESERVA` referencia a `HABITACION` usando ambas columnas

```bash

# Detener PostgreSQL localDESTROZO (id_destrozo, id_registro, fecha_reporte, descripcion, costo, estado)

sudo service postgresql stop

``````- `REGISTRO` referencia a `RESERVA` y `HABITACION`    ├── 02_generar_datos_masivos_oracle_OPTIMIZADO.sql    ├── 02_generar_datos_masivos_oracle_OPTIMIZADO.sql



### No conecta a BD

```bash

# Ver logs### **Funcionalidades SQL**- `DESTROZO` referencia a `REGISTRO`

docker logs postgres-hotel



# Reiniciar

docker restart postgres-hotel#### **1. Función: Cliente Más Recurrente**### Opción 2: Manual

```

```sql

### Frontend no conecta

```bashSELECT * FROM fn_cliente_mas_recurrente(1);  -- Hotel ID 1## 🔧 Comandos Útiles

# Verificar backend

curl http://localhost:3001/-- Retorna: cliente_id, nombre_cliente, apellido_cliente, total_reservas



# Verificar puerto en frontend/src/api.js```    ├── 05_benchmark_postgres.sql    ├── 05_benchmark_postgres.sql

```



---

#### **2. Función: Calcular Costo de Reserva**### Conectar a PostgreSQL

## 🎓 Arquitectura

```sql

```

React (3000)SELECT calcular_costo_reserva(1, 101, '2024-01-15', '2024-01-20') as costo;**1. Levantar Bases de Datos**

    ↓ HTTP

Express (3001)-- Parámetros: id_hotel, id_habitacion, fecha_ini, fecha_fin

    ↓ executeQuery()

DB Adapter → Convierte $1 → ? | @p1 | :1``````bash

    ↓

DB Multi → getPool()

    ↓

PostgreSQL | MySQL | SQL Server | Oracle#### **3. Procedimiento: Consultar Habitaciones**docker exec -it postgres-hotel psql -U admin_hotel -d hotel_db    ├── 06_benchmark_oracle.sql    ├── 06_benchmark_oracle.sql

```

```sql

**El adaptador traduce queries automáticamente:**

- PostgreSQL: `$1, $2, $3`CALL sp_consultar_habitaciones_hotel(1, 'Disponible', NULL, NULL);```

- MySQL: `?, ?, ?`

- SQL Server: `@p1, @p2, @p3`-- Parámetros: id_hotel, estado (opcional), tipo (opcional), capacidad_min (opcional)

- Oracle: `:1, :2, :3`

``````bash

✨ **Escribes una vez, funciona en 4 gestores.**



---

#### **4. Función: Generar Factura con Cursor**### Conectar a Oracle

**Versión**: 2.0.0  

**Fecha**: 27 de octubre de 2025  ```sql

**Estado**: ✅ Producción Ready

SELECT * FROM generar_factura(1);  -- Reserva ID 1docker-compose up -d    └── metricas.sql    └── metricas.sql

-- Retorna: item, descripcion, monto (Estadía, Servicios, Impuestos, Daños, TOTAL)

``````bash



#### **5. Trigger: Actualizar Estado Habitación**docker exec -it oracle-hotel sqlplus hotel_user/hotel123@FREEPDB1```

```sql

-- Automático al crear reserva: Disponible → Ocupada```

-- Automático al cancelar: Ocupada → Disponible

`````````



---### Ver logs



## 🔄 Cambiar Base de DatosEsto crea:



El sistema soporta **4 gestores** de bases de datos. Para cambiar:```bash



### **PostgreSQL → MySQL**# PostgreSQL- **PostgreSQL**: `localhost:5432` - Usuario: `admin_hotel` / Password: `hotel123`



#### **1. Instalar driver**docker logs postgres-hotel

```bash

cd backend- **Oracle 23c Free**: `localhost:1521` - Usuario: `hotel_user` / Password: `hotel123`

npm install mysql2

```# Oracle



#### **2. Levantar MySQL**docker logs oracle-hotel## 🚀 Inicio Rápido## 🚀 Inicio Rápido

```bash

docker run -d --name mysql-hotel \```

  -e MYSQL_DATABASE=hotel_db \

  -e MYSQL_USER=admin_hotel \**2. Ejecutar Benchmark de PostgreSQL**

  -e MYSQL_PASSWORD=hotel123 \

  -p 3306:3306 mysql:8.0### Ver estadísticas en tiempo real

```



#### **3. Editar `.env`**

```bash```bash

DB_TYPE=mysql

DB_PORT=3306docker stats postgres-hotel oracle-hotel```bash

```

```

#### **4. Reiniciar backend**

```bashpython3 benchmark.py### 1. Levantar Bases de Datos### 1. Levantar Bases de Datos

npm restart

```### Reiniciar contenedores



**Consulta `GUIA_MIGRACION_BASES_DATOS.md` para conversión completa de scripts SQL.**```



---```bash



## ⚙️ Configuracióndocker-compose restart



### **Variables de Entorno** (`.env`)```



```bashEsto:

# Tipo de base de datos

DB_TYPE=postgresql  # postgresql | mysql | mssql | oracle### Detener todo



# Conexión- Genera 1.4 millones de registros (100K clientes, 1K hoteles, 50K habitaciones, 500K reservas, 500K registros, 250K destrozos)```bash```bash

DB_HOST=localhost

DB_PORT=5432        # 5432 PostgreSQL, 3306 MySQL, 1433 SQL Server, 1521 Oracle```bash

DB_NAME=hotel_db

DB_USER=admin_hoteldocker-compose down- Ejecuta 5 queries de prueba

DB_PASSWORD=hotel123

```

# Servidor

PORT=3001- Muestra métricas de rendimiento (tiempo, CPU, memoria, cache)docker-compose up -ddocker-compose up -d

```

## 📈 Resultados del Benchmark

---



## 🧪 Testing

**PostgreSQL ganó en todas las categorías:**

### **Probar API**

**Tiempo estimado**: ~15 segundos para todo el proceso``````

```bash

# Verificar servidor| Métrica | PostgreSQL | Oracle |

curl http://localhost:3001/

|---------|------------|--------|

# Listar hoteles

curl http://localhost:3001/api/hotels| Carga de datos (1.4M registros) | 11.41s | Timeout (>180s) |



# Habitaciones disponibles| Tiempo total queries | 352 ms | 476 ms (estimado) |## 📊 Esquema de la Base de Datos

curl http://localhost:3001/api/hotels/1/rooms

| Uso de memoria | 186 MB | 2,213 MB |

# Cliente más recurrente

curl http://localhost:3001/api/clients/top/1| CPU | 0.04% | 3.41% |



# Pagos pendientes| Cache hit ratio | 99.99% | 98.50% |

curl http://localhost:3001/api/payments/pending

### Tablas PrincipalesEsto crea:Esto crea:

# Factura

curl http://localhost:3001/api/invoices/1**Conclusión**: PostgreSQL es **350% más rápido** en carga de datos y usa **12x menos memoria**.

```



---

## 🐍 Dependencias Python

## 📊 Datos de Prueba

1. **CLIENTE** - Información de clientes- **PostgreSQL**: `localhost:5432` - Usuario: `admin_hotel` / Password: `hotel123`- **PostgreSQL**: `localhost:5432` - Usuario: `admin_hotel` / Password: `hotel123`

El sistema incluye datos de prueba:

- **50 clientes** bolivianos```bash

- **10 hoteles** en diferentes ciudades

- **277 habitaciones** (Simple, Doble, Suite)pip3 install psycopg2-binary2. **HOTEL** - Datos de hoteles

- **64 reservas** con estados variados

- **Precios**: Bs. 120 - Bs. 350 por noche```



---3. **HABITACION** - Habitaciones por hotel (PK compuesta: id_hotel, id_habitacion)- **Oracle 23c Free**: `localhost:1521` - Usuario: `hotel_user` / Password: `hotel123`- **Oracle 23c Free**: `localhost:1521` - Usuario: `hotel_user` / Password: `hotel123`



## 🎯 Características Principales## 📝 Notas Técnicas



### **Frontend**4. **RESERVA** - Reservaciones de habitaciones

- ✅ Lista de hoteles con estadísticas

- ✅ Búsqueda de habitaciones por hotel- **PostgreSQL** usa `generate_series()` para inserciones ultra-rápidas (122K registros/segundo)

- ✅ Cliente más recurrente por hotel

- ✅ Creación de reservas con auto-cliente- El schema usa llaves compuestas para simular escenarios reales complejos5. **REGISTRO** - Check-in/check-out

- ✅ **Tabla dinámica de habitaciones** (nueva feature)

- ✅ **Filtro de pagos por hotel** (nueva feature)- TRUNCATE CASCADE es usado para limpieza rápida de datos

- ✅ Generación de facturas detalladas

- Todo el código SQL está embebido en `benchmark.py` - no se requieren archivos externos6. **DESTROZO** - Daños reportados

### **Backend**

- ✅ Arquitectura multi-base de datos

- ✅ Adaptador universal de queries

- ✅ Transacciones con rollback## ⚠️ Problemas Conocidos### 2. Ejecutar Benchmark de PostgreSQL### 2. Ejecutar Benchmark de PostgreSQL

- ✅ Funciones SQL reutilizables

- ✅ Procedimientos con parámetros OUT

- ✅ Cursores explícitos para reportes

1. **Oracle Timeout**: Oracle Free puede colgarse al generar >1M registros### Relaciones Clave

### **Base de Datos**

- ✅ 6 tablas relacionadas2. **Conexiones bloqueadas**: Si PostgreSQL se bloquea, usar:

- ✅ 3 funciones PL/pgSQL

- ✅ 1 procedimiento almacenado   ```sql

- ✅ 2 triggers automáticos

- ✅ Foreign keys con CASCADE   SELECT pg_terminate_backend(pid) FROM pg_stat_activity 

- ✅ Índices optimizados

   WHERE state = 'active' AND pid <> pg_backend_pid();- `HABITACION` tiene PK compuesta: `(id_hotel, id_habitacion)`

---

   ```

## 🐳 Docker

- `RESERVA` referencia a `HABITACION` usando ambas columnas```bash```bash

### **Comandos Útiles**

## 📄 Licencia

```bash

# Levantar PostgreSQL- `REGISTRO` referencia a `RESERVA` y `HABITACION`

docker-compose up -d postgres

Proyecto educativo - Uso libre

# Ver logs

docker logs postgres-hotel- `DESTROZO` referencia a `REGISTRO`python3 benchmark.pypython3 benchmark.py



# Conectar a psql

docker exec -it postgres-hotel psql -U admin_hotel -d hotel_db

## 🔧 Comandos Útiles``````

# Detener

docker-compose down



# Eliminar datos (reset completo)### Conectar a PostgreSQL

docker-compose down -v

```



---```bashEsto:Esto:



## 📚 Documentación Adicionaldocker exec -it postgres-hotel psql -U admin_hotel -d hotel_db



| Archivo | Descripción |```- Genera 1.4 millones de registros (100K clientes, 1K hoteles, 50K habitaciones, 500K reservas, 500K registros, 250K destrozos)- Genera 1.4 millones de registros (100K clientes, 1K hoteles, 50K habitaciones, 500K reservas, 500K registros, 250K destrozos)

|---------|-------------|

| `GUIA_MIGRACION_BASES_DATOS.md` | Guía completa para migrar a MySQL, SQL Server u Oracle |

| `GUIA_MULTI_BASE_DATOS.md` | Opciones de conexión simultánea a múltiples BDs |

### Conectar a Oracle- Ejecuta 5 queries de prueba- Ejecuta 5 queries de prueba

---



## 🔧 Troubleshooting

```bash- Muestra métricas de rendimiento (tiempo, CPU, memoria, cache)- Muestra métricas de rendimiento (tiempo, CPU, memoria, cache)

### **Error: Port 5432 already in use**

```bashdocker exec -it oracle-hotel sqlplus hotel_user/hotel123@FREEPDB1

# Detener PostgreSQL local

sudo service postgresql stop```



# O cambiar puerto en docker-compose.yml

ports:

  - "5433:5432"### Ver logs**Tiempo estimado**: ~15 segundos para todo el proceso**Tiempo estimado**: ~15 segundos para todo el proceso

```



### **Error: Cannot connect to database**

```bash```bash

# Verificar que el contenedor está corriendo

docker ps | grep postgres# PostgreSQL



# Ver logsdocker logs postgres-hotel## 📊 Esquema de la Base de Datos## 📊 Esquema de la Base de Datos

docker logs postgres-hotel



# Reiniciar contenedor

docker restart postgres-hotel# Oracle

```

docker logs oracle-hotel

### **Error: Frontend no conecta con backend**

```bash```### Tablas Principales### Tablas Principales

# Verificar que backend está corriendo

curl http://localhost:3001/



# Revisar CORS en backend/server.js### Ver estadísticas en tiempo real

# Verificar puerto en frontend/src/api.js

```



---```bash1. **CLIENTE** - Información de clientes1. **CLIENTE** - Información de clientes



## 🎓 Arquitecturadocker stats postgres-hotel oracle-hotel



### **Flujo de Datos**```2. **HOTEL** - Datos de hoteles2. **HOTEL** - Datos de hoteles



```

React Frontend (3000)

    ↓ HTTP Request### Reiniciar contenedores3. **HABITACION** - Habitaciones por hotel (PK compuesta: id_hotel, id_habitacion)3. **HABITACION** - Habitaciones por hotel (PK compuesta: id_hotel, id_habitacion)

Express API (3001)

    ↓ executeQuery()

DB Adapter

    ↓ Convierte $1 → ? | @p1 | :1```bash4. **RESERVA** - Reservaciones de habitaciones4. **RESERVA** - Reservaciones de habitaciones

DB Multi

    ↓ getPool()docker-compose restart

PostgreSQL | MySQL | SQL Server | Oracle

``````5. **REGISTRO** - Check-in/check-out5. **REGISTRO** - Check-in/check-out



### **Adaptador Universal**



El adaptador traduce automáticamente:### Detener todo6. **DESTROZO** - Daños reportados6. **DESTROZO** - Daños reportados

- `$1, $2, $3` → PostgreSQL

- `?, ?, ?` → MySQL

- `@p1, @p2, @p3` → SQL Server

- `:1, :2, :3` → Oracle```bash



**Resultado**: Escribes código una vez, funciona en 4 gestores.docker-compose down



---```### Relaciones Clave### Relaciones Clave



**Versión**: 2.0.0  

**Última actualización**: 27 de octubre de 2025  

**Estado**: ✅ Producción Ready## 📈 Resultados del Benchmark




**PostgreSQL ganó en todas las categorías:**- `HABITACION` tiene PK compuesta: `(id_hotel, id_habitacion)`- `HABITACION` tiene PK compuesta: `(id_hotel, id_habitacion)`



| Métrica | PostgreSQL | Oracle |- `RESERVA` referencia a `HABITACION` usando ambas columnas- `RESERVA` referencia a `HABITACION` usando ambas columnas

|---------|------------|--------|

| Carga de datos (1.4M registros) | 11.41s | Timeout (>180s) |- `REGISTRO` referencia a `RESERVA` y `HABITACION`- `REGISTRO` referencia a `RESERVA` y `HABITACION`

| Tiempo total queries | 352 ms | 476 ms (estimado) |

| Uso de memoria | 186 MB | 2,213 MB |- `DESTROZO` referencia a `REGISTRO`- `DESTROZO` referencia a `REGISTRO`

| CPU | 0.04% | 3.41% |

| Cache hit ratio | 99.99% | 98.50% |



**Conclusión**: PostgreSQL es **350% más rápido** en carga de datos y usa **12x menos memoria**.## 🔧 Comandos Útiles## 🔧 Comandos Útiles



## 🐍 Dependencias Python



```bash### Conectar a PostgreSQL### Conectar a PostgreSQL

pip3 install psycopg2-binary

```



## 📝 Notas Técnicas```bash```bash



- **PostgreSQL** usa `generate_series()` para inserciones ultra-rápidas (122K registros/segundo)docker exec -it postgres-hotel psql -U admin_hotel -d hotel_dbdocker exec -it postgres-hotel psql -U admin_hotel -d hotel_db

- **Oracle** usa `FORALL` bulk inserts pero es considerablemente más lento

- El schema usa llaves compuestas para simular escenarios reales complejos``````

- TRUNCATE CASCADE es usado para limpieza rápida de datos



## ⚠️ Problemas Conocidos

### Conectar a Oracle### Conectar a Oracle

1. **Oracle Timeout**: Oracle Free puede colgarse al generar >1M registros

2. **Conexiones bloqueadas**: Si PostgreSQL se bloquea, usar:

   ```sql

   SELECT pg_terminate_backend(pid) FROM pg_stat_activity ```bash```bash

   WHERE state = 'active' AND pid <> pg_backend_pid();

   ```docker exec -it oracle-hotel sqlplus hotel_user/hotel123@FREEPDB1docker exec -it oracle-hotel sqlplus hotel_user/hotel123@FREEPDB1



## 📄 Licencia``````



Proyecto educativo - Uso libre


### Ver logs### Ver logs



```bash```bash

# PostgreSQL# PostgreSQL

docker logs postgres-hoteldocker logs postgres-hotel



# Oracle# Oracle

docker logs oracle-hoteldocker logs oracle-hotel

``````



### Reiniciar contenedores### Reiniciar contenedores



```bash```bash

docker-compose restartdocker-compose restart

``````



### Detener todo### Detener todo



```bash```bash

docker-compose downdocker-compose down

``````



## 📈 Resultados del Benchmark## 📈 Resultados del Benchmark



**PostgreSQL ganó en todas las categorías:****PostgreSQL ganó en todas las categorías:**



| Métrica | PostgreSQL | Oracle || Métrica | PostgreSQL | Oracle |

|---------|------------|--------||---------|------------|--------|

| Carga de datos (1.4M registros) | 11.41s | Timeout (>180s) || Carga de datos (1.4M registros) | 11.41s | Timeout (>180s) |

| Tiempo total queries | 352 ms | 476 ms (estimado) || Tiempo total queries | 352 ms | 476 ms (estimado) |

| Uso de memoria | 186 MB | 2,213 MB || Uso de memoria | 186 MB | 2,213 MB |

| CPU | 0.04% | 3.41% || CPU | 0.04% | 3.41% |

| Cache hit ratio | 99.99% | 98.50% || Cache hit ratio | 99.99% | 98.50% |



**Conclusión**: PostgreSQL es **350% más rápido** en carga de datos y usa **12x menos memoria**.**Conclusión**: PostgreSQL es **350% más rápido** en carga de datos y usa **12x menos memoria**.



## 🐍 Dependencias Python## 🐍 Dependencias Python



```bash```bash

pip3 install psycopg2-binarypip3 install psycopg2-binary

``````



## 📝 Notas Técnicas## 📝 Notas Técnicas



- **PostgreSQL** usa `generate_series()` para inserciones ultra-rápidas (122K registros/segundo)- **PostgreSQL** usa `generate_series()` para inserciones ultra-rápidas (122K registros/segundo)

- **Oracle** usa `FORALL` bulk inserts pero es considerablemente más lento- **Oracle** usa `FORALL` bulk inserts pero es considerablemente más lento

- El schema usa llaves compuestas para simular escenarios reales complejos- El schema usa llaves compuestas para simular escenarios reales complejos

- TRUNCATE CASCADE es usado para limpieza rápida de datos- TRUNCATE CASCADE es usado para limpieza rápida de datos



## ⚠️ Problemas Conocidos## ⚠️ Problemas Conocidos



1. **Oracle Timeout**: Oracle Free puede colgarse al generar >1M registros1. **Oracle Timeout**: Oracle Free puede colgarse al generar >1M registros

2. **Conexiones bloqueadas**: Si PostgreSQL se bloquea, usar:2. **Conexiones bloqueadas**: Si PostgreSQL se bloquea, usar:

   ```sql   ```sql

   SELECT pg_terminate_backend(pid) FROM pg_stat_activity    SELECT pg_terminate_backend(pid) FROM pg_stat_activity 

   WHERE state = 'active' AND pid <> pg_backend_pid();   WHERE state = 'active' AND pid <> pg_backend_pid();

   ```   ```



## 📄 Licencia## 📄 Licencia



Proyecto educativo - Uso libreProyecto educativo - Uso libre


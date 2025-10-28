# 🏨 Sistema de Gestión Hotelera Multi-Base de Datos# 🏨 Sistema de Gestión Hotelera v2.0# 🏨 Sistema de Gestión Hotelera v2.0# 🏨 Sistema de Gestión Hotelera# 🏨 Sistema de Gestión Hotelera# 🏨 Sistema de Gestión Hotelera# 🏨 Sistema de Gestión Hotelera



<div align="center">



![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)Sistema completo de gestión hotelera con **arquitectura multi-base de datos**. Soporta PostgreSQL, MySQL, SQL Server y Oracle.

![Node](https://img.shields.io/badge/node-16%2B-brightgreen.svg)

![React](https://img.shields.io/badge/react-18.2.0-61dafb.svg)

![License](https://img.shields.io/badge/license-MIT-green.svg)

![PostgreSQL](https://img.shields.io/badge/postgresql-15-336791.svg)---Sistema completo de gestión hotelera con **arquitectura multi-base de datos**, soporte para PostgreSQL, MySQL, SQL Server y Oracle.

![MySQL](https://img.shields.io/badge/mysql-8.0-4479A1.svg)

![SQL Server](https://img.shields.io/badge/sql%20server-2019-CC2927.svg)

![Oracle](https://img.shields.io/badge/oracle-21c-F80000.svg)

## 🚀 Inicio Rápido

**Sistema completo de gestión hotelera con arquitectura multi-base de datos**



[Características](#-características) • [Instalación](#-inicio-rápido) • [API](#-api-endpoints) • [Documentación](#-documentación) • [Contribuir](#-contribuir)

### 1. Levantar Base de Datos---Sistema de base de datos para gestión hotelera con soporte para PostgreSQL y Oracle.

</div>



---

```bash

## 📋 Tabla de Contenidos

docker-compose up -d postgres

- [Características](#-características)

- [Tecnologías](#-tecnologías)```## 🚀 Inicio Rápido

- [Arquitectura](#-arquitectura)

- [Inicio Rápido](#-inicio-rápido)

- [Estructura del Proyecto](#-estructura-del-proyecto)

- [API Endpoints](#-api-endpoints)### 2. Iniciar Backend

- [Funcionalidades SQL](#-funcionalidades-sql-avanzadas)

- [Cambiar Base de Datos](#-cambiar-base-de-datos)

- [Testing](#-testing)

- [Datos de Prueba](#-datos-de-prueba)```bash### **1. Levantar Base de Datos (PostgreSQL)**## 📁 Estructura del ProyectoSistema de base de datos para gestión hotelera con soporte para PostgreSQL y Oracle.

- [Documentación](#-documentación)

- [Contribuir](#-contribuir)cd backend

- [Troubleshooting](#-troubleshooting)

- [Licencia](#-licencia)npm install



---npm start



## ✨ Características``````bash



### 🎯 Funcionalidades Principales



- ✅ **Multi-Base de Datos**: Cambia entre PostgreSQL, MySQL, SQL Server y Oracle sin modificar código### 3. Iniciar Frontenddocker-compose up -d postgres

- ✅ **API RESTful**: 11 endpoints completamente funcionales

- ✅ **Frontend React**: Interfaz moderna y responsive

- ✅ **Adaptador Universal**: Traduce queries automáticamente entre gestores

- ✅ **Funciones Avanzadas SQL**: Procedimientos, triggers, cursores```bash``````

- ✅ **Docker Ready**: Levanta PostgreSQL con un comando

- ✅ **Gestión Completa**: Hoteles, clientes, reservas, pagos, facturascd frontend



### 🔥 Características Técnicasnpm install



- 🚀 **Arquitectura Limpia**: Patrón Factory + Adapternpm start

- 📦 **Sin Vendor Lock-in**: Independencia total del gestor de BD

- 🔄 **Hot Swap**: Cambia de BD reiniciando el servidor```### **2. Iniciar Backend**proyecto-hotel/

- 🎨 **Componentizado**: 6 componentes React reutilizables

- 🛡️ **Manejo de Errores**: Logging centralizado

- 📝 **Documentación Completa**: README + guías especializadas

### 4. Acceder

---



## 🛠️ Tecnologías

- **Frontend**: http://localhost:3000```bash├── docker-compose.yml          # Contenedores PostgreSQL y Oracle## 📁 Estructura del ProyectoSistema de base de datos para gestión hotelera con soporte para PostgreSQL y Oracle.Sistema de base de datos para gestión hotelera con soporte para PostgreSQL y Oracle.

### Backend

- **Runtime**: Node.js 16+- **Backend API**: http://localhost:3001

- **Framework**: Express 4.18.2

- **Drivers DB**: - **PostgreSQL**: localhost:5432cd backend

  - `pg` 8.11.3 (PostgreSQL)

  - `mysql2` 3.6.0 (MySQL) - opcional

  - `mssql` 10.0.1 (SQL Server) - opcional

  - `oracledb` 6.2.0 (Oracle) - opcional## 📊 Tecnologíasnpm start



### Frontend

- **Framework**: React 18.2.0

- **HTTP Client**: Axios 1.5.0- **Backend**: Node.js + Express 4.18.2```├── benchmark.py                # Script de benchmark (PostgreSQL)

- **Build Tool**: Create React App

- **Frontend**: React 18.2.0  

### Base de Datos

- **PostgreSQL** 15 (por defecto)- **Base de Datos**: PostgreSQL 15 (soporta MySQL, SQL Server, Oracle)

- **MySQL** 8.0 (soportado)

- **SQL Server** 2019 (soportado)- **Adaptador**: Convierte queries automáticamente entre gestores

- **Oracle** 21c (soportado)

### **3. Iniciar Frontend**├── README.md                   # Este archivo

### DevOps

- **Containerización**: Docker + Docker Compose---

- **Control de Versiones**: Git



---



## 🏗️ Arquitectura



```

┌─────────────────────────────────────────────────────────────┐---- `GET /api/payments/pending?hotelId=X` - Filtrar por hotel

│                      CLIENTE (Browser)                       │

│                     React Frontend                           │

│                    http://localhost:3000                     │

└──────────────────────┬──────────────────────────────────────┘## 🐳 Docker- `PATCH /api/payments/:reservaId/mark-paid` - Marcar como pagado3. **HABITACION** - Habitaciones por hotel (PK compuesta: id_hotel, id_habitacion)

                       │ HTTP/REST

                       ▼

┌─────────────────────────────────────────────────────────────┐

│                   SERVIDOR (Node.js)                         │```bash

│                  Express + API REST                          │

│                 http://localhost:3001                        │# Levantar

│                                                               │

│  ┌──────────────────────────────────────────────────────┐  │docker-compose up -d postgres### **Facturas**4. **RESERVA** - Reservaciones de habitaciones- 🔌 Conectar a PostgreSQL o Oracle└── benchmark/                 # Scripts de benchmark y pruebas└── benchmark/                 # Scripts de benchmark y pruebas

│  │              Backend Routes (5)                       │  │

│  │  /api/hotels  /api/clients  /api/reservations        │  │

│  │  /api/payments  /api/invoices                        │  │

│  └────────────────────┬─────────────────────────────────┘  │# Logs- `GET /api/invoices/:reservaId` - Generar factura de una reserva

│                       │                                      │

│  ┌────────────────────▼─────────────────────────────────┐  │docker logs postgres-hotel

│  │           DB Adapter (Universal)                      │  │

│  │      Traduce queries entre gestores                   │  │5. **REGISTRO** - Check-in/check-out

│  │    $1 → ? (MySQL) → @p1 (SQL Server) → :1 (Oracle)  │  │

│  └────────────────────┬─────────────────────────────────┘  │# Conectar

│                       │                                      │

│  ┌────────────────────▼─────────────────────────────────┐  │docker exec -it postgres-hotel psql -U admin_hotel -d hotel_db---

│  │         DB Multi (Factory Pattern)                    │  │

│  │     Crea pool según variable DB_TYPE                  │  │

│  └────────────────────┬─────────────────────────────────┘  │

└───────────────────────┼──────────────────────────────────────┘# Detener6. **DESTROZO** - Daños reportados- 📊 Ejecutar benchmarks

                        │

        ┌───────────────┼───────────────┐docker-compose down

        │               │               │

        ▼               ▼               ▼## 🗄️ Base de Datos

   PostgreSQL        MySQL        SQL Server / Oracle

   Port 5432      Port 3306      Port 1433 / 1521# Reset completo

```

docker-compose down -v

**Flujo de Datos:**

1. Cliente hace petición HTTP → Backend Express```

2. Route recibe request → Llama a `executeQuery()`

3. Adapter traduce query → Convierte sintaxis según `DB_TYPE`### **Esquema Principal**

4. Factory crea pool → Conecta al gestor configurado

5. Gestor ejecuta query → Retorna resultados---

6. Backend normaliza datos → Envía JSON al cliente

7. React actualiza UI → Usuario ve resultados### Relaciones Clave- 📈 Ver estadísticas en tiempo real    ├── 01_generar_datos_masivos_postgres_OPTIMIZADO.sql    ├── 01_generar_datos_masivos_postgres_OPTIMIZADO.sql



---## 📚 Documentación



## 🚀 Inicio Rápido```sql



### Prerrequisitos| Archivo | Descripción |



```bash|---------|-------------|CLIENTE (id_cliente, nombre, apellido_paterno, apellido_materno, fecha_naci)

# Verificar instalaciones

node --version  # >= 16.0.0| `docs/GUIA_MIGRACION_BASES_DATOS.md` | Migración a MySQL/SQL Server/Oracle |

npm --version   # >= 8.0.0

docker --version # >= 20.0.0| `docs/GUIA_MULTI_BASE_DATOS.md` | Conexión simultánea a múltiples BDs |HOTEL (id_hotel, nombre, direccion, ciudad, pais, telefono, email, categoria)

git --version   # >= 2.0.0

```



### Instalación---HABITACION (id_hotel, id_habitacion, tipo, capacidad_personas, precio_noche, estado)- `HABITACION` tiene PK compuesta: `(id_hotel, id_habitacion)`- 🗂️ Ver logs



#### 1️⃣ Clonar el Repositorio



```bash## 🔧 TroubleshootingRESERVA (id_reserva, fecha_reserva, fecha_ini, fecha_fin, num_huespedes, costo, estado, id_cliente, id_habitacion, id_hotel)

git clone https://github.com/Jazavala1992/Proyecto_hotel.git

cd Proyecto_hotel

```

### Puerto ocupadoREGISTRO (id_registro, id_reserva, fecha_checkin, hora_checkin, fecha_checkout, hora_checkout)- `RESERVA` referencia a `HABITACION` usando ambas columnas

#### 2️⃣ Levantar Base de Datos

```bash

```bash

# PostgreSQL (por defecto)# Detener PostgreSQL localDESTROZO (id_destrozo, id_registro, fecha_reporte, descripcion, costo, estado)

docker-compose up -d postgres

sudo service postgresql stop

# Verificar que esté corriendo

docker ps | grep postgres``````- `REGISTRO` referencia a `RESERVA` y `HABITACION`    ├── 02_generar_datos_masivos_oracle_OPTIMIZADO.sql    ├── 02_generar_datos_masivos_oracle_OPTIMIZADO.sql

```



#### 3️⃣ Configurar Backend

### No conecta a BD

```bash

cd backend```bash



# Instalar dependencias# Ver logs### **Funcionalidades SQL**- `DESTROZO` referencia a `REGISTRO`

npm install

docker logs postgres-hotel

# Configurar variables de entorno

cp .env.example .env



# Editar .env con tus credenciales# Reiniciar

nano .env

```docker restart postgres-hotel#### **1. Función: Cliente Más Recurrente**### Opción 2: Manual



**Archivo `.env` básico:**```

```properties

PORT=3001```sql

DB_TYPE=postgresql

DB_HOST=localhost### Frontend no conecta

DB_PORT=5432

DB_NAME=hotel_db```bashSELECT * FROM fn_cliente_mas_recurrente(1);  -- Hotel ID 1## 🔧 Comandos Útiles

DB_USER=admin_hotel

DB_PASSWORD=hotel123# Verificar backend

```

curl http://localhost:3001/-- Retorna: cliente_id, nombre_cliente, apellido_cliente, total_reservas

#### 4️⃣ Inicializar Base de Datos



```bash

# Desde la raíz del proyecto# Verificar puerto en frontend/src/api.js```    ├── 05_benchmark_postgres.sql    ├── 05_benchmark_postgres.sql

psql -U admin_hotel -h localhost -d hotel_db -f init-scripts/01-create-tables.sql

psql -U admin_hotel -h localhost -d hotel_db -f init-scripts/02-insert-data.sql```

psql -U admin_hotel -h localhost -d hotel_db -f init-scripts/03-functions.sql

psql -U admin_hotel -h localhost -d hotel_db -f init-scripts/04-procedures.sql

psql -U admin_hotel -h localhost -d hotel_db -f init-scripts/05-triggers.sql

psql -U admin_hotel -h localhost -d hotel_db -f init-scripts/06-funcionalidades-adicionales.sql---



# O con Docker:#### **2. Función: Calcular Costo de Reserva**### Conectar a PostgreSQL

docker exec -i proyecto-hotel-postgres-1 psql -U admin_hotel -d hotel_db < init-scripts/01-create-tables.sql

# ... repetir para los demás scripts## 🎓 Arquitectura

```

```sql

#### 5️⃣ Iniciar Backend

```

```bash

cd backendReact (3000)SELECT calcular_costo_reserva(1, 101, '2024-01-15', '2024-01-20') as costo;**1. Levantar Bases de Datos**

npm start

    ↓ HTTP

# Deberías ver:

# ✅ Servidor corriendo en puerto 3001Express (3001)-- Parámetros: id_hotel, id_habitacion, fecha_ini, fecha_fin

# ✅ Conectado a base de datos: POSTGRESQL

# ✅ Host: localhost:5432    ↓ executeQuery()

# ✅ Base de datos: hotel_db

```DB Adapter → Convierte $1 → ? | @p1 | :1``````bash



#### 6️⃣ Iniciar Frontend    ↓



```bashDB Multi → getPool()

# En otra terminal

cd frontend    ↓

npm install

npm startPostgreSQL | MySQL | SQL Server | Oracle#### **3. Procedimiento: Consultar Habitaciones**docker exec -it postgres-hotel psql -U admin_hotel -d hotel_db    ├── 06_benchmark_oracle.sql    ├── 06_benchmark_oracle.sql



# Se abrirá automáticamente en http://localhost:3000```

```

```sql

#### 7️⃣ Verificar Instalación

**El adaptador traduce queries automáticamente:**

```bash

# Probar API- PostgreSQL: `$1, $2, $3`CALL sp_consultar_habitaciones_hotel(1, 'Disponible', NULL, NULL);```

curl http://localhost:3001/

# Respuesta: {"message":"Hotel API v2.0.0","database":"POSTGRESQL"}- MySQL: `?, ?, ?`



# Probar endpoint de hoteles- SQL Server: `@p1, @p2, @p3`-- Parámetros: id_hotel, estado (opcional), tipo (opcional), capacidad_min (opcional)

curl http://localhost:3001/api/hotels

# Respuesta: Array con 10 hoteles- Oracle: `:1, :2, :3`

```

``````bash

---

✨ **Escribes una vez, funciona en 4 gestores.**

## 📁 Estructura del Proyecto



```

proyecto-hotel/---

│

├── backend/                          # Backend Node.js + Express#### **4. Función: Generar Factura con Cursor**### Conectar a Oracle

│   ├── config/

│   │   ├── db-multi.js              # Factory: Crea pools según DB_TYPE**Versión**: 2.0.0  

│   │   └── db-adapter.js            # Adapter: Traduce queries

│   ├── routes/**Fecha**: 27 de octubre de 2025  ```sql

│   │   ├── hotels.js                # GET /api/hotels

│   │   ├── clients.js               # GET /api/clients/***Estado**: ✅ Producción Ready

│   │   ├── reservations.js          # POST /api/reservations

│   │   ├── payments.js              # GET /api/payments/*SELECT * FROM generar_factura(1);  -- Reserva ID 1docker-compose up -d    └── metricas.sql    └── metricas.sql

│   │   └── invoices.js              # POST /api/invoices/generate

│   ├── server.js                    # Servidor Express principal-- Retorna: item, descripcion, monto (Estadía, Servicios, Impuestos, Daños, TOTAL)

│   ├── package.json                 # Dependencias

│   ├── .env                         # Variables de entorno (NO en Git)``````bash

│   └── .env.example                 # Template de configuración

│

├── frontend/                         # Frontend React

│   ├── src/#### **5. Trigger: Actualizar Estado Habitación**docker exec -it oracle-hotel sqlplus hotel_user/hotel123@FREEPDB1```

│   │   ├── components/

│   │   │   ├── HotelList.js         # Lista de hoteles```sql

│   │   │   ├── HotelRooms.js        # Habitaciones por hotel

│   │   │   ├── TopClient.js         # Cliente top-- Automático al crear reserva: Disponible → Ocupada```

│   │   │   ├── ReservationForm.js   # Crear reserva

│   │   │   ├── PendingPayments.js   # Pagos pendientes-- Automático al cancelar: Ocupada → Disponible

│   │   │   └── InvoiceGenerator.js  # Generar factura

│   │   ├── api.js                   # Cliente HTTP (axios)`````````

│   │   ├── App.js                   # Componente principal

│   │   └── index.js                 # Entry point

│   └── package.json

│---### Ver logs

├── init-scripts/                     # Scripts de inicialización SQL

│   ├── 01-create-tables.sql         # 6 tablas

│   ├── 02-insert-data.sql           # 50 clientes, 10 hoteles, 277 habitaciones

│   ├── 03-functions.sql             # 3 funciones## 🔄 Cambiar Base de DatosEsto crea:

│   ├── 04-procedures.sql            # 1 procedimiento

│   ├── 05-triggers.sql              # 2 triggers

│   └── 06-funcionalidades-adicionales.sql  # Cursor + funciones avanzadas

│El sistema soporta **4 gestores** de bases de datos. Para cambiar:```bash

├── docs/                             # Documentación especializada

│   ├── GUIA_MIGRACION_BASES_DATOS.md   # Cómo migrar a MySQL/SQL Server/Oracle

│   ├── GUIA_MULTI_BASE_DATOS.md        # Conexiones simultáneas

│   └── RESUMEN_LIMPIEZA.md             # Historial de optimización### **PostgreSQL → MySQL**# PostgreSQL- **PostgreSQL**: `localhost:5432` - Usuario: `admin_hotel` / Password: `hotel123`

│

├── docker-compose.yml                # Contenedores Docker

├── .gitignore                        # Archivos excluidos de Git

├── LICENSE                           # Licencia MIT#### **1. Instalar driver**docker logs postgres-hotel

├── CONTRIBUTING.md                   # Guía de contribución

└── README.md                         # Este archivo```bash

```

cd backend- **Oracle 23c Free**: `localhost:1521` - Usuario: `hotel_user` / Password: `hotel123`

---

npm install mysql2

## 🔌 API Endpoints

```# Oracle

### Base URL: `http://localhost:3001`



| Método | Endpoint | Descripción | Parámetros |

|--------|----------|-------------|------------|#### **2. Levantar MySQL**docker logs oracle-hotel## 🚀 Inicio Rápido## 🚀 Inicio Rápido

| `GET` | `/` | Info del servidor | - |

| `GET` | `/api/hotels` | Lista todos los hoteles | - |```bash

| `GET` | `/api/hotels/:id/rooms` | Habitaciones de un hotel | `id` (path) |

| `GET` | `/api/clients` | Lista todos los clientes | - |docker run -d --name mysql-hotel \```

| `GET` | `/api/clients/top` | Cliente con más reservas | - |

| `GET` | `/api/clients/:id` | Información de un cliente | `id` (path) |  -e MYSQL_DATABASE=hotel_db \

| `POST` | `/api/reservations` | Crear nueva reserva | `body` (JSON) |

| `GET` | `/api/reservations/:clientId` | Reservas de un cliente | `clientId` (path) |  -e MYSQL_USER=admin_hotel \**2. Ejecutar Benchmark de PostgreSQL**

| `GET` | `/api/payments/pending` | Pagos pendientes | - |

| `POST` | `/api/payments` | Registrar pago | `body` (JSON) |  -e MYSQL_PASSWORD=hotel123 \

| `POST` | `/api/invoices/generate` | Generar factura | `body` (JSON) |

  -p 3306:3306 mysql:8.0### Ver estadísticas en tiempo real

### Ejemplos de Uso

```

#### 1. Obtener todos los hoteles

```bash

curl http://localhost:3001/api/hotels

```#### **3. Editar `.env`**



**Respuesta:**```bash```bash

```json

[DB_TYPE=mysql

  {

    "id": 1,DB_PORT=3306docker stats postgres-hotel oracle-hotel```bash

    "nombre": "Hotel Plaza",

    "direccion": "Calle Principal 123",```

    "ciudad": "Ciudad de México",

    "estrellas": 5,```

    "total_habitaciones": 28

  },#### **4. Reiniciar backend**

  ...

]```bashpython3 benchmark.py### 1. Levantar Bases de Datos### 1. Levantar Bases de Datos

```

npm restart

#### 2. Obtener habitaciones de un hotel

```bash```### Reiniciar contenedores

curl http://localhost:3001/api/hotels/1/rooms

```



**Respuesta:****Consulta `GUIA_MIGRACION_BASES_DATOS.md` para conversión completa de scripts SQL.**```

```json

[

  {

    "id": 1,---```bash

    "numero": "101",

    "tipo": "Suite",

    "precio": 2500.00,

    "disponible": true## ⚙️ Configuracióndocker-compose restart

  },

  ...

]

```### **Variables de Entorno** (`.env`)```



#### 3. Crear una reserva

```bash

curl -X POST http://localhost:3001/api/reservations \```bashEsto:

  -H "Content-Type: application/json" \

  -d '{# Tipo de base de datos

    "cliente_id": 1,

    "habitacion_id": 5,DB_TYPE=postgresql  # postgresql | mysql | mssql | oracle### Detener todo

    "fecha_inicio": "2025-11-01",

    "fecha_fin": "2025-11-05",

    "numero_huespedes": 2

  }'# Conexión- Genera 1.4 millones de registros (100K clientes, 1K hoteles, 50K habitaciones, 500K reservas, 500K registros, 250K destrozos)```bash```bash

```

DB_HOST=localhost

**Respuesta:**

```jsonDB_PORT=5432        # 5432 PostgreSQL, 3306 MySQL, 1433 SQL Server, 1521 Oracle```bash

{

  "message": "Reserva creada exitosamente",DB_NAME=hotel_db

  "reservationId": 42,

  "total": 10000.00DB_USER=admin_hoteldocker-compose down- Ejecuta 5 queries de prueba

}

```DB_PASSWORD=hotel123



#### 4. Cliente con más reservas (usando función SQL)```

```bash

curl http://localhost:3001/api/clients/top# Servidor

```

PORT=3001- Muestra métricas de rendimiento (tiempo, CPU, memoria, cache)docker-compose up -ddocker-compose up -d

**Respuesta:**

```json```

{

  "id": 15,## 📈 Resultados del Benchmark

  "nombre": "María García",

  "email": "maria@example.com",---

  "total_reservas": 8,

  "gasto_total": 45000.00

}

```## 🧪 Testing



#### 5. Pagos pendientes**PostgreSQL ganó en todas las categorías:**

```bash

curl http://localhost:3001/api/payments/pending### **Probar API**

```

**Tiempo estimado**: ~15 segundos para todo el proceso``````

**Respuesta:**

```json```bash

[

  {# Verificar servidor| Métrica | PostgreSQL | Oracle |

    "reserva_id": 23,

    "cliente": "Juan Pérez",curl http://localhost:3001/

    "hotel": "Hotel Plaza",

    "monto_pendiente": 5000.00,|---------|------------|--------|

    "dias_vencido": 3

  },# Listar hoteles

  ...

]curl http://localhost:3001/api/hotels| Carga de datos (1.4M registros) | 11.41s | Timeout (>180s) |

```



---

# Habitaciones disponibles| Tiempo total queries | 352 ms | 476 ms (estimado) |## 📊 Esquema de la Base de Datos

## 🎯 Funcionalidades SQL Avanzadas

curl http://localhost:3001/api/hotels/1/rooms

El sistema incluye funciones, procedimientos, triggers y cursores en PostgreSQL:

| Uso de memoria | 186 MB | 2,213 MB |

### 1. **Función**: Obtener cliente top

```sql# Cliente más recurrente

SELECT * FROM obtener_cliente_top();

-- Retorna el cliente con más reservascurl http://localhost:3001/api/clients/top/1| CPU | 0.04% | 3.41% |

```



### 2. **Función**: Calcular total de reserva

```sql# Pagos pendientes| Cache hit ratio | 99.99% | 98.50% |

SELECT calcular_total_reserva(42);

-- Retorna el costo total de la reserva #42curl http://localhost:3001/api/payments/pending

```

### Tablas PrincipalesEsto crea:Esto crea:

### 3. **Función**: Habitaciones disponibles

```sql# Factura

SELECT obtener_habitaciones_disponibles(1, '2025-11-01', '2025-11-05');

-- Retorna habitaciones disponibles del hotel #1 en esas fechascurl http://localhost:3001/api/invoices/1**Conclusión**: PostgreSQL es **350% más rápido** en carga de datos y usa **12x menos memoria**.

```

```

### 4. **Procedimiento**: Procesar pagos pendientes

```sql

CALL procesar_pagos_pendientes();

-- Actualiza el estado de pagos vencidos---

```

## 🐍 Dependencias Python

### 5. **Trigger**: Actualizar disponibilidad de habitación

```sql## 📊 Datos de Prueba

-- Se ejecuta automáticamente al crear una reserva

-- Marca la habitación como no disponible1. **CLIENTE** - Información de clientes- **PostgreSQL**: `localhost:5432` - Usuario: `admin_hotel` / Password: `hotel123`- **PostgreSQL**: `localhost:5432` - Usuario: `admin_hotel` / Password: `hotel123`

```

El sistema incluye datos de prueba:

### 6. **Trigger**: Validar fechas de reserva

```sql- **50 clientes** bolivianos```bash

-- Se ejecuta antes de insertar una reserva

-- Valida que fecha_fin > fecha_inicio- **10 hoteles** en diferentes ciudades

```

- **277 habitaciones** (Simple, Doble, Suite)pip3 install psycopg2-binary2. **HOTEL** - Datos de hoteles

### 7. **Cursor**: Generar reporte de hoteles

```sql- **64 reservas** con estados variados

-- Itera sobre todos los hoteles y calcula estadísticas

SELECT * FROM generar_reporte_hoteles();- **Precios**: Bs. 120 - Bs. 350 por noche```

```



---

---3. **HABITACION** - Habitaciones por hotel (PK compuesta: id_hotel, id_habitacion)- **Oracle 23c Free**: `localhost:1521` - Usuario: `hotel_user` / Password: `hotel123`- **Oracle 23c Free**: `localhost:1521` - Usuario: `hotel_user` / Password: `hotel123`

## 🔄 Cambiar Base de Datos



El sistema soporta 4 gestores de bases de datos. Cambiar es muy simple:

## 🎯 Características Principales## 📝 Notas Técnicas

### PostgreSQL → MySQL



#### 1️⃣ Instalar driver

```bash### **Frontend**4. **RESERVA** - Reservaciones de habitaciones

cd backend

npm install mysql2- ✅ Lista de hoteles con estadísticas

```

- ✅ Búsqueda de habitaciones por hotel- **PostgreSQL** usa `generate_series()` para inserciones ultra-rápidas (122K registros/segundo)

#### 2️⃣ Modificar `.env`

```properties- ✅ Cliente más recurrente por hotel

DB_TYPE=mysql

DB_PORT=3306- ✅ Creación de reservas con auto-cliente- El schema usa llaves compuestas para simular escenarios reales complejos5. **REGISTRO** - Check-in/check-out

DB_NAME=hotel_db

DB_USER=root- ✅ **Tabla dinámica de habitaciones** (nueva feature)

DB_PASSWORD=mysql123

```- ✅ **Filtro de pagos por hotel** (nueva feature)- TRUNCATE CASCADE es usado para limpieza rápida de datos



#### 3️⃣ Crear base de datos MySQL- ✅ Generación de facturas detalladas

```bash

docker-compose up -d mysql- Todo el código SQL está embebido en `benchmark.py` - no se requieren archivos externos6. **DESTROZO** - Daños reportados



# Convertir scripts SQL (sintaxis ligeramente diferente)### **Backend**

# Ver docs/GUIA_MIGRACION_BASES_DATOS.md

```- ✅ Arquitectura multi-base de datos



#### 4️⃣ Reiniciar backend- ✅ Adaptador universal de queries

```bash

npm start- ✅ Transacciones con rollback## ⚠️ Problemas Conocidos### 2. Ejecutar Benchmark de PostgreSQL### 2. Ejecutar Benchmark de PostgreSQL

```

- ✅ Funciones SQL reutilizables

✅ ¡Listo! Ahora estás usando MySQL sin cambiar ni una línea de código.

- ✅ Procedimientos con parámetros OUT

### PostgreSQL → SQL Server

- ✅ Cursores explícitos para reportes

#### 1️⃣ Instalar driver

```bash1. **Oracle Timeout**: Oracle Free puede colgarse al generar >1M registros### Relaciones Clave

npm install mssql

```### **Base de Datos**



#### 2️⃣ Modificar `.env`- ✅ 6 tablas relacionadas2. **Conexiones bloqueadas**: Si PostgreSQL se bloquea, usar:

```properties

DB_TYPE=mssql- ✅ 3 funciones PL/pgSQL

DB_PORT=1433

DB_NAME=hotel_db- ✅ 1 procedimiento almacenado   ```sql

DB_USER=sa

DB_PASSWORD=YourStrong!Passw0rd- ✅ 2 triggers automáticos

```

- ✅ Foreign keys con CASCADE   SELECT pg_terminate_backend(pid) FROM pg_stat_activity 

#### 3️⃣ Reiniciar

```bash- ✅ Índices optimizados

npm start

```   WHERE state = 'active' AND pid <> pg_backend_pid();- `HABITACION` tiene PK compuesta: `(id_hotel, id_habitacion)`



### PostgreSQL → Oracle---



#### 1️⃣ Instalar driver   ```

```bash

npm install oracledb## 🐳 Docker

```

- `RESERVA` referencia a `HABITACION` usando ambas columnas```bash```bash

#### 2️⃣ Modificar `.env`

```properties### **Comandos Útiles**

DB_TYPE=oracle

DB_PORT=1521## 📄 Licencia

DB_NAME=XEPDB1

DB_USER=system```bash

DB_PASSWORD=oracle123

```# Levantar PostgreSQL- `REGISTRO` referencia a `RESERVA` y `HABITACION`



#### 3️⃣ Reiniciardocker-compose up -d postgres

```bash

npm startProyecto educativo - Uso libre

```

# Ver logs

**Nota**: El adaptador traduce automáticamente:

- PostgreSQL: `SELECT * FROM hoteles WHERE id = $1`docker logs postgres-hotel- `DESTROZO` referencia a `REGISTRO`python3 benchmark.pypython3 benchmark.py

- MySQL: `SELECT * FROM hoteles WHERE id = ?`

- SQL Server: `SELECT * FROM hoteles WHERE id = @p1`

- Oracle: `SELECT * FROM hoteles WHERE id = :1`

# Conectar a psql

---

docker exec -it postgres-hotel psql -U admin_hotel -d hotel_db

## 🧪 Testing

## 🔧 Comandos Útiles``````

### Probar Backend

# Detener

```bash

cd backenddocker-compose down



# Verificar servidor

curl http://localhost:3001/

# Eliminar datos (reset completo)### Conectar a PostgreSQL

# Probar todos los endpoints

curl http://localhost:3001/api/hotelsdocker-compose down -v

curl http://localhost:3001/api/hotels/1/rooms

curl http://localhost:3001/api/clients```

curl http://localhost:3001/api/clients/top

curl http://localhost:3001/api/payments/pending



# Crear reserva de prueba---```bashEsto:Esto:

curl -X POST http://localhost:3001/api/reservations \

  -H "Content-Type: application/json" \

  -d '{

    "cliente_id": 1,## 📚 Documentación Adicionaldocker exec -it postgres-hotel psql -U admin_hotel -d hotel_db

    "habitacion_id": 5,

    "fecha_inicio": "2025-12-01",

    "fecha_fin": "2025-12-05",

    "numero_huespedes": 2| Archivo | Descripción |```- Genera 1.4 millones de registros (100K clientes, 1K hoteles, 50K habitaciones, 500K reservas, 500K registros, 250K destrozos)- Genera 1.4 millones de registros (100K clientes, 1K hoteles, 50K habitaciones, 500K reservas, 500K registros, 250K destrozos)

  }'

```|---------|-------------|



### Probar Frontend| `GUIA_MIGRACION_BASES_DATOS.md` | Guía completa para migrar a MySQL, SQL Server u Oracle |



```bash| `GUIA_MULTI_BASE_DATOS.md` | Opciones de conexión simultánea a múltiples BDs |

cd frontend

### Conectar a Oracle- Ejecuta 5 queries de prueba- Ejecuta 5 queries de prueba

# Iniciar en modo desarrollo

npm start---



# Abrir en navegador:

# http://localhost:3000

```## 🔧 Troubleshooting



### Probar Base de Datos```bash- Muestra métricas de rendimiento (tiempo, CPU, memoria, cache)- Muestra métricas de rendimiento (tiempo, CPU, memoria, cache)



```bash### **Error: Port 5432 already in use**

# Conectar a PostgreSQL

psql -U admin_hotel -h localhost -d hotel_db```bashdocker exec -it oracle-hotel sqlplus hotel_user/hotel123@FREEPDB1



# Queries de prueba# Detener PostgreSQL local

SELECT COUNT(*) FROM hoteles;          -- Debe retornar 10

SELECT COUNT(*) FROM clientes;         -- Debe retornar 50sudo service postgresql stop```

SELECT COUNT(*) FROM habitaciones;     -- Debe retornar 277



# Probar función

SELECT * FROM obtener_cliente_top();# O cambiar puerto en docker-compose.yml



# Probar procedimientoports:

CALL procesar_pagos_pendientes();

  - "5433:5432"### Ver logs**Tiempo estimado**: ~15 segundos para todo el proceso**Tiempo estimado**: ~15 segundos para todo el proceso

# Salir

\q```

```



---

### **Error: Cannot connect to database**

## 📊 Datos de Prueba

```bash```bash

El sistema incluye datos de prueba realistas:

# Verificar que el contenedor está corriendo

| Tabla | Registros | Descripción |

|-------|-----------|-------------|docker ps | grep postgres# PostgreSQL

| `hoteles` | 10 | Hoteles de 1 a 5 estrellas |

| `habitaciones` | 277 | Tipos: Simple, Doble, Suite (15-28 por hotel) |

| `clientes` | 50 | Nombres, emails, teléfonos |

| `reservas` | ~100 | Reservas activas y pasadas |# Ver logsdocker logs postgres-hotel## 📊 Esquema de la Base de Datos## 📊 Esquema de la Base de Datos

| `pagos` | ~150 | Pagos completados y pendientes |

| `facturas` | ~80 | Facturas generadas |docker logs postgres-hotel



### Ejemplos de Hoteles



- **Hotel Plaza** (5⭐) - Ciudad de México - 28 habitaciones# Reiniciar contenedor

- **Hotel Ejecutivo** (4⭐) - Monterrey - 24 habitaciones

- **Hotel Express** (3⭐) - Guadalajara - 20 habitacionesdocker restart postgres-hotel# Oracle



### Cliente de Ejemplo```



```sqldocker logs oracle-hotel

-- Cliente ID: 1

nombre: 'Juan Pérez'### **Error: Frontend no conecta con backend**

email: 'juan.perez@example.com'

telefono: '+52 55 1234 5678'```bash```### Tablas Principales### Tablas Principales

```

# Verificar que backend está corriendo

---

curl http://localhost:3001/

## 📚 Documentación



### Guías Especializadas

# Revisar CORS en backend/server.js### Ver estadísticas en tiempo real

- 📖 **[GUIA_MIGRACION_BASES_DATOS.md](docs/GUIA_MIGRACION_BASES_DATOS.md)**

  - Migración a MySQL# Verificar puerto en frontend/src/api.js

  - Migración a SQL Server

  - Migración a Oracle```

  - Diferencias de sintaxis SQL



- 📖 **[GUIA_MULTI_BASE_DATOS.md](docs/GUIA_MULTI_BASE_DATOS.md)**

  - Conexiones simultáneas---```bash1. **CLIENTE** - Información de clientes1. **CLIENTE** - Información de clientes

  - Dual pool configuration

  - Selector de BD por endpoint



- 📖 **[RESUMEN_LIMPIEZA.md](docs/RESUMEN_LIMPIEZA.md)**## 🎓 Arquitecturadocker stats postgres-hotel oracle-hotel

  - Historial de optimización

  - Archivos eliminados

  - Estadísticas del proyecto

### **Flujo de Datos**```2. **HOTEL** - Datos de hoteles2. **HOTEL** - Datos de hoteles

### Documentación del Código



```javascript

// Cada función está documentada con JSDoc```

/**

 * Ejecuta una query adaptada al gestor de BD actualReact Frontend (3000)

 * @param {Object} pool - Connection pool

 * @param {string} query - Query SQL con placeholders PostgreSQL ($1, $2...)    ↓ HTTP Request### Reiniciar contenedores3. **HABITACION** - Habitaciones por hotel (PK compuesta: id_hotel, id_habitacion)3. **HABITACION** - Habitaciones por hotel (PK compuesta: id_hotel, id_habitacion)

 * @param {Array} params - Parámetros de la query

 * @returns {Promise<Array>} Resultados normalizadosExpress API (3001)

 */

async function executeQuery(pool, query, params) {    ↓ executeQuery()

  // ...

}DB Adapter

```

    ↓ Convierte $1 → ? | @p1 | :1```bash4. **RESERVA** - Reservaciones de habitaciones4. **RESERVA** - Reservaciones de habitaciones

---

DB Multi

## 🤝 Contribuir

    ↓ getPool()docker-compose restart

¡Las contribuciones son bienvenidas! Lee la [Guía de Contribución](CONTRIBUTING.md) para empezar.

PostgreSQL | MySQL | SQL Server | Oracle

### Proceso Rápido

``````5. **REGISTRO** - Check-in/check-out5. **REGISTRO** - Check-in/check-out

1. **Fork** el repositorio

2. **Crea** una rama (`git checkout -b feature/amazing-feature`)

3. **Commit** tus cambios (`git commit -m 'feat: add amazing feature'`)

4. **Push** a la rama (`git push origin feature/amazing-feature`)### **Adaptador Universal**

5. **Abre** un Pull Request



### Áreas que Necesitan Ayuda

El adaptador traduce automáticamente:### Detener todo6. **DESTROZO** - Daños reportados6. **DESTROZO** - Daños reportados

- ✅ Tests unitarios (aumentar cobertura)

- 📝 Documentación (más ejemplos)- `$1, $2, $3` → PostgreSQL

- 🎨 UI/UX (mejorar interfaz)

- 🚀 Performance (optimizar queries)- `?, ?, ?` → MySQL

- 🌍 Internacionalización (agregar idiomas)

- `@p1, @p2, @p3` → SQL Server

---

- `:1, :2, :3` → Oracle```bash

## 🐛 Troubleshooting



### Error: "Cannot connect to database"

**Resultado**: Escribes código una vez, funciona en 4 gestores.docker-compose down

**Solución:**

```bash

# Verificar que el contenedor esté corriendo

docker ps | grep postgres---```### Relaciones Clave### Relaciones Clave



# Verificar credenciales en .env

cat backend/.env

**Versión**: 2.0.0  

# Reintentar conexión

cd backend && npm start**Última actualización**: 27 de octubre de 2025  

```

**Estado**: ✅ Producción Ready## 📈 Resultados del Benchmark

### Error: "Port 3001 already in use"



**Solución:**

```bash

# Encontrar proceso usando el puerto**PostgreSQL ganó en todas las categorías:**- `HABITACION` tiene PK compuesta: `(id_hotel, id_habitacion)`- `HABITACION` tiene PK compuesta: `(id_hotel, id_habitacion)`

lsof -i :3001



# Matar proceso

kill -9 <PID>| Métrica | PostgreSQL | Oracle |- `RESERVA` referencia a `HABITACION` usando ambas columnas- `RESERVA` referencia a `HABITACION` usando ambas columnas



# O cambiar puerto en .env|---------|------------|--------|

PORT=3002

```| Carga de datos (1.4M registros) | 11.41s | Timeout (>180s) |- `REGISTRO` referencia a `RESERVA` y `HABITACION`- `REGISTRO` referencia a `RESERVA` y `HABITACION`



### Error: "relation 'hoteles' does not exist"| Tiempo total queries | 352 ms | 476 ms (estimado) |



**Solución:**| Uso de memoria | 186 MB | 2,213 MB |- `DESTROZO` referencia a `REGISTRO`- `DESTROZO` referencia a `REGISTRO`

```bash

# Ejecutar scripts de inicialización| CPU | 0.04% | 3.41% |

cd proyecto-hotel

psql -U admin_hotel -h localhost -d hotel_db -f init-scripts/01-create-tables.sql| Cache hit ratio | 99.99% | 98.50% |

psql -U admin_hotel -h localhost -d hotel_db -f init-scripts/02-insert-data.sql

```



### Frontend no se conecta al backend**Conclusión**: PostgreSQL es **350% más rápido** en carga de datos y usa **12x menos memoria**.## 🔧 Comandos Útiles## 🔧 Comandos Útiles



**Solución:**

```bash

# Verificar que backend esté corriendo## 🐍 Dependencias Python

curl http://localhost:3001/



# Verificar CORS en server.js

# Debe incluir: app.use(cors());```bash### Conectar a PostgreSQL### Conectar a PostgreSQL



# Verificar URL en frontend/src/api.jspip3 install psycopg2-binary

# Debe ser: baseURL: 'http://localhost:3001'

``````



### Error al instalar `oracledb`



**Solución:**## 📝 Notas Técnicas```bash```bash

```bash

# Oracle requiere cliente nativo

# Instalar Oracle Instant Client

# Ver: https://oracle.github.io/node-oracledb/INSTALL.html- **PostgreSQL** usa `generate_series()` para inserciones ultra-rápidas (122K registros/segundo)docker exec -it postgres-hotel psql -U admin_hotel -d hotel_dbdocker exec -it postgres-hotel psql -U admin_hotel -d hotel_db



# O usar solo PostgreSQL/MySQL que no requieren librerías nativas- **Oracle** usa `FORALL` bulk inserts pero es considerablemente más lento

```

- El schema usa llaves compuestas para simular escenarios reales complejos``````

---

- TRUNCATE CASCADE es usado para limpieza rápida de datos

## 📊 Comandos Docker



```bash

# Levantar PostgreSQL## ⚠️ Problemas Conocidos

docker-compose up -d postgres

### Conectar a Oracle### Conectar a Oracle

# Ver logs

docker-compose logs -f postgres1. **Oracle Timeout**: Oracle Free puede colgarse al generar >1M registros



# Detener2. **Conexiones bloqueadas**: Si PostgreSQL se bloquea, usar:

docker-compose down

   ```sql

# Reiniciar con datos limpios

docker-compose down -v   SELECT pg_terminate_backend(pid) FROM pg_stat_activity ```bash```bash

docker-compose up -d postgres

   WHERE state = 'active' AND pid <> pg_backend_pid();

# Conectar al contenedor

docker exec -it proyecto-hotel-postgres-1 bash   ```docker exec -it oracle-hotel sqlplus hotel_user/hotel123@FREEPDB1docker exec -it oracle-hotel sqlplus hotel_user/hotel123@FREEPDB1



# Ejecutar psql dentro del contenedor

docker exec -it proyecto-hotel-postgres-1 psql -U admin_hotel -d hotel_db

```## 📄 Licencia``````



---



## 📄 LicenciaProyecto educativo - Uso libre



Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

### Ver logs### Ver logs

```

MIT License



Copyright (c) 2025 Jose Zavala```bash```bash



Se concede permiso gratuito a cualquier persona que obtenga una copia# PostgreSQL# PostgreSQL

de este software para usar, copiar, modificar, fusionar, publicar,

distribuir, sublicenciar y/o vender copias del Software...docker logs postgres-hoteldocker logs postgres-hotel

```



---

# Oracle# Oracle

## 👨‍💻 Autor

docker logs oracle-hoteldocker logs oracle-hotel

**Jose Zavala**

- GitHub: [@Jazavala1992](https://github.com/Jazavala1992)``````

- Proyecto: [Proyecto_hotel](https://github.com/Jazavala1992/Proyecto_hotel)



---

### Reiniciar contenedores### Reiniciar contenedores

## 🙏 Agradecimientos



- Node.js y Express por el excelente framework backend

- React por la librería de UI```bash```bash

- PostgreSQL por el robusto gestor de BD

- Comunidad open source por el soportedocker-compose restartdocker-compose restart



---``````



## 📈 Roadmap



### v2.1.0 (Próxima versión)### Detener todo### Detener todo

- [ ] Tests unitarios con Jest

- [ ] Tests de integración

- [ ] CI/CD con GitHub Actions

- [ ] Deploy a producción (Heroku/Railway)```bash```bash



### v2.2.0docker-compose downdocker-compose down

- [ ] Autenticación JWT

- [ ] Roles de usuario (Admin, Recepcionista, Cliente)``````

- [ ] Panel de administración

- [ ] Reportes en PDF



### v3.0.0## 📈 Resultados del Benchmark## 📈 Resultados del Benchmark

- [ ] WebSockets para reservas en tiempo real

- [ ] Sistema de notificaciones

- [ ] Integración con pasarelas de pago

- [ ] App móvil con React Native**PostgreSQL ganó en todas las categorías:****PostgreSQL ganó en todas las categorías:**



---



## 📞 Soporte| Métrica | PostgreSQL | Oracle || Métrica | PostgreSQL | Oracle |



¿Tienes preguntas? Abre un [Issue](https://github.com/Jazavala1992/Proyecto_hotel/issues) o inicia una [Discusión](https://github.com/Jazavala1992/Proyecto_hotel/discussions).|---------|------------|--------||---------|------------|--------|



---| Carga de datos (1.4M registros) | 11.41s | Timeout (>180s) || Carga de datos (1.4M registros) | 11.41s | Timeout (>180s) |



<div align="center">| Tiempo total queries | 352 ms | 476 ms (estimado) || Tiempo total queries | 352 ms | 476 ms (estimado) |



**⭐ Si te gusta este proyecto, dale una estrella en GitHub ⭐**| Uso de memoria | 186 MB | 2,213 MB || Uso de memoria | 186 MB | 2,213 MB |



[![GitHub stars](https://img.shields.io/github/stars/Jazavala1992/Proyecto_hotel?style=social)](https://github.com/Jazavala1992/Proyecto_hotel/stargazers)| CPU | 0.04% | 3.41% || CPU | 0.04% | 3.41% |

[![GitHub forks](https://img.shields.io/github/forks/Jazavala1992/Proyecto_hotel?style=social)](https://github.com/Jazavala1992/Proyecto_hotel/network/members)

| Cache hit ratio | 99.99% | 98.50% || Cache hit ratio | 99.99% | 98.50% |

**Hecho con ❤️ y ☕ por Jose Zavala**



</div>

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


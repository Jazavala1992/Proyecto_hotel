CREATE TABLE CLIENTE (
    id_cliente INTEGER PRIMARY KEY,
    nombre VARCHAR(100),
    apellido_paterno VARCHAR(100),
    apellido_materno VARCHAR(100),
    fecha_naci DATE
);

CREATE TABLE HOTEL (
    id_hotel INTEGER PRIMARY KEY,
    nombre VARCHAR(150),
    direccion VARCHAR(200),
    ciudad VARCHAR(100),
    pais VARCHAR(100),
    telefono VARCHAR(30),
    email VARCHAR(150),
    categoria VARCHAR(50)
);

CREATE TABLE HABITACION (
    id_hotel INTEGER,
    id_habitacion INTEGER,
    tipo VARCHAR(100),
    capacidad_personas INTEGER,
    precio_noche DECIMAL(10,2),
    estado VARCHAR(50),
    PRIMARY KEY (id_hotel, id_habitacion),
    FOREIGN KEY (id_hotel) REFERENCES HOTEL(id_hotel)
);

CREATE TABLE RESERVA (
    id_reserva INTEGER PRIMARY KEY,
    fecha_reserva DATE,
    fecha_ini DATE,
    fecha_fin DATE,
    num_huespedes INTEGER,
    costo DECIMAL(10,2),
    estado VARCHAR(50),
    observaciones VARCHAR(255),
    id_cliente INTEGER,
    id_habitacion INTEGER,
    id_hotel INTEGER,
    FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente),
    FOREIGN KEY (id_hotel, id_habitacion) REFERENCES HABITACION(id_hotel, id_habitacion)
);

CREATE TABLE REGISTRO (
    id_registro INTEGER PRIMARY KEY,
    fecha_checkin DATE,
    hora_checkin TIME,
    fecha_checkout DATE,
    hora_checkout TIME,
    id_reserva INTEGER,
    id_hotel INTEGER,
    id_habitacion INTEGER,
    FOREIGN KEY (id_reserva) REFERENCES RESERVA(id_reserva),
    FOREIGN KEY (id_hotel, id_habitacion) REFERENCES HABITACION(id_hotel, id_habitacion)
);

CREATE TABLE DESTROZO (
    id_destrozo INTEGER PRIMARY KEY,
    fecha_reporte DATE,
    descripcion VARCHAR(255),
    costo DECIMAL(10,2),
    estado VARCHAR(50),
    id_registro INTEGER,
    FOREIGN KEY (id_registro) REFERENCES REGISTRO(id_registro)
);
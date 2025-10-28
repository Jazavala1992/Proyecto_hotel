-- ============================================
-- FUNCIONES - POSTGRESQL
-- Sistema de Gestión Hotelera
-- ============================================

-- Configuración
SET client_encoding = 'UTF8';

-- ============================================
-- FUNCIONES DE CÁLCULO
-- ============================================

-- Función: Calcular días de estancia
CREATE OR REPLACE FUNCTION calcular_dias_estancia(
    p_fecha_ini DATE,
    p_fecha_fin DATE
) RETURNS INTEGER AS $$
BEGIN
    RETURN (p_fecha_fin - p_fecha_ini);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

COMMENT ON FUNCTION calcular_dias_estancia IS 'Calcula el número de días entre dos fechas';


-- Función: Calcular costo total de reserva
CREATE OR REPLACE FUNCTION calcular_costo_reserva(
    p_id_hotel INTEGER,
    p_id_habitacion INTEGER,
    p_fecha_ini DATE,
    p_fecha_fin DATE
) RETURNS NUMERIC(10,2) AS $$
DECLARE
    v_precio_noche NUMERIC(10,2);
    v_dias INTEGER;
BEGIN
    -- Obtener precio por noche
    SELECT precio_noche INTO v_precio_noche
    FROM habitacion
    WHERE id_hotel = p_id_hotel AND id_habitacion = p_id_habitacion;
    
    -- Calcular días
    v_dias := calcular_dias_estancia(p_fecha_ini, p_fecha_fin);
    
    -- Retornar costo total
    RETURN v_precio_noche * v_dias;
END;
$$ LANGUAGE plpgsql STABLE;

COMMENT ON FUNCTION calcular_costo_reserva IS 'Calcula el costo total de una reserva basado en precio por noche y días de estancia';


-- ============================================
-- FUNCIONES DE VALIDACIÓN
-- ============================================

-- Función: Validar disponibilidad de habitación
CREATE OR REPLACE FUNCTION validar_disponibilidad(
    p_id_hotel INTEGER,
    p_id_habitacion INTEGER,
    p_fecha_ini DATE,
    p_fecha_fin DATE
) RETURNS BOOLEAN AS $$
DECLARE
    v_count INTEGER;
BEGIN
    -- Verificar si la habitación está disponible
    SELECT COUNT(*) INTO v_count
    FROM reserva
    WHERE id_hotel = p_id_hotel 
      AND id_habitacion = p_id_habitacion
      AND estado IN ('Confirmada', 'Pendiente')
      AND (
          (p_fecha_ini BETWEEN fecha_ini AND fecha_fin) OR
          (p_fecha_fin BETWEEN fecha_ini AND fecha_fin) OR
          (fecha_ini BETWEEN p_fecha_ini AND p_fecha_fin)
      );
    
    RETURN (v_count = 0);
END;
$$ LANGUAGE plpgsql STABLE;

COMMENT ON FUNCTION validar_disponibilidad IS 'Verifica si una habitación está disponible en el rango de fechas especificado';


-- Función: Validar capacidad de huéspedes
CREATE OR REPLACE FUNCTION validar_capacidad_huespedes(
    p_id_hotel INTEGER,
    p_id_habitacion INTEGER,
    p_num_huespedes INTEGER
) RETURNS BOOLEAN AS $$
DECLARE
    v_capacidad INTEGER;
BEGIN
    SELECT capacidad_personas INTO v_capacidad
    FROM habitacion
    WHERE id_hotel = p_id_hotel AND id_habitacion = p_id_habitacion;
    
    RETURN (p_num_huespedes <= v_capacidad);
END;
$$ LANGUAGE plpgsql STABLE;

COMMENT ON FUNCTION validar_capacidad_huespedes IS 'Verifica si el número de huéspedes no excede la capacidad de la habitación';


-- ============================================
-- FUNCIONES DE CONSULTA
-- ============================================

-- Función: Obtener ocupación de hotel (porcentaje)
CREATE OR REPLACE FUNCTION obtener_ocupacion_hotel(
    p_id_hotel INTEGER,
    p_fecha DATE DEFAULT CURRENT_DATE
) RETURNS NUMERIC(5,2) AS $$
DECLARE
    v_total_habitaciones INTEGER;
    v_habitaciones_ocupadas INTEGER;
BEGIN
    -- Total de habitaciones del hotel
    SELECT COUNT(*) INTO v_total_habitaciones
    FROM habitacion
    WHERE id_hotel = p_id_hotel;
    
    -- Habitaciones ocupadas en la fecha
    SELECT COUNT(DISTINCT id_habitacion) INTO v_habitaciones_ocupadas
    FROM reserva
    WHERE id_hotel = p_id_hotel
      AND p_fecha BETWEEN fecha_ini AND fecha_fin
      AND estado = 'Confirmada';
    
    -- Calcular porcentaje
    IF v_total_habitaciones = 0 THEN
        RETURN 0;
    END IF;
    
    RETURN (v_habitaciones_ocupadas::NUMERIC / v_total_habitaciones * 100);
END;
$$ LANGUAGE plpgsql STABLE;

COMMENT ON FUNCTION obtener_ocupacion_hotel IS 'Calcula el porcentaje de ocupación de un hotel en una fecha específica';


-- Función: Contar reservas activas por cliente
CREATE OR REPLACE FUNCTION contar_reservas_activas(
    p_id_cliente INTEGER
) RETURNS INTEGER AS $$
BEGIN
    RETURN (
        SELECT COUNT(*)
        FROM reserva
        WHERE id_cliente = p_id_cliente
          AND estado IN ('Confirmada', 'Pendiente')
          AND fecha_fin >= CURRENT_DATE
    );
END;
$$ LANGUAGE plpgsql STABLE;

COMMENT ON FUNCTION contar_reservas_activas IS 'Cuenta el número de reservas activas de un cliente';


-- ============================================
-- FUNCIONES AUXILIARES
-- ============================================

-- Función: Generar código de confirmación único
CREATE OR REPLACE FUNCTION generar_codigo_confirmacion()
RETURNS VARCHAR(10) AS $$
BEGIN
    RETURN 'HTL' || LPAD(FLOOR(RANDOM() * 9999999)::TEXT, 7, '0');
END;
$$ LANGUAGE plpgsql VOLATILE;

COMMENT ON FUNCTION generar_codigo_confirmacion IS 'Genera un código de confirmación único para reservas';


-- Función: Obtener nombre completo del cliente
CREATE OR REPLACE FUNCTION obtener_nombre_completo(
    p_id_cliente INTEGER
) RETURNS VARCHAR(200) AS $$
DECLARE
    v_nombre_completo VARCHAR(200);
BEGIN
    SELECT nombre || ' ' || apellido_paterno || ' ' || COALESCE(apellido_materno, '')
    INTO v_nombre_completo
    FROM cliente
    WHERE id_cliente = p_id_cliente;
    
    RETURN TRIM(v_nombre_completo);
END;
$$ LANGUAGE plpgsql STABLE;

COMMENT ON FUNCTION obtener_nombre_completo IS 'Retorna el nombre completo de un cliente';


---------------------


--FUNCION PARA EL CLIENTE MAS RECURRENTE


CREATE OR REPLACE FUNCTION fn_cliente_mas_recurrente(
    p_id_hotel INTEGER
) 
RETURNS TABLE(
    cliente_id INTEGER, 
    nombre_cliente TEXT, 
    apellido_cliente TEXT, 
    total_reservas BIGINT
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM HOTEL WHERE id_hotel = p_id_hotel) THEN
        RAISE EXCEPTION 'El hotel con ID % no existe.', p_id_hotel;
    END IF;
    RETURN QUERY
    SELECT
        c.id_cliente AS cliente_id,
        c.nombre::TEXT AS nombre_cliente,
        c.apellido_paterno::TEXT AS apellido_cliente,
        COUNT(r.id_reserva) AS total_reservas
    FROM
        RESERVA r
    JOIN
        CLIENTE c ON r.id_cliente = c.id_cliente
    WHERE
        r.id_hotel = p_id_hotel
    GROUP BY
        c.id_cliente, c.nombre, c.apellido_paterno
    ORDER BY
        total_reservas DESC
    LIMIT 1;
    IF NOT FOUND THEN
        RAISE NOTICE 'No se encontraron reservas para el hotel ID %.', p_id_hotel;
    END IF;
END;
$$;

#llamada
#con el id del htel 1

SELECT * FROM fn_cliente_mas_recurrente(1);


-- ============================================
-- MENSAJE DE CONFIRMACIÓN
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '✅ Funciones creadas exitosamente';
    RAISE NOTICE '   - Funciones de cálculo: 2';
    RAISE NOTICE '   - Funciones de validación: 2';
    RAISE NOTICE '   - Funciones de consulta: 2';
    RAISE NOTICE '   - Funciones auxiliares: 2';
END $$;

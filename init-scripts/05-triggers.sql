-- ============================================
-- TRIGGERS - POSTGRESQL
-- Sistema de Gestión Hotelera
-- ============================================

-- Configuración
SET client_encoding = 'UTF8';

-- ============================================
-- TABLA DE AUDITORÍA
-- ============================================

-- Crear tabla para auditoría de cambios
CREATE TABLE IF NOT EXISTS auditoria_reservas (
    id_auditoria SERIAL PRIMARY KEY,
    id_reserva INTEGER NOT NULL,
    accion VARCHAR(20) NOT NULL,
    usuario VARCHAR(100) DEFAULT CURRENT_USER,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    datos_anteriores JSONB,
    datos_nuevos JSONB
);

COMMENT ON TABLE auditoria_reservas IS 'Registra todos los cambios en la tabla de reservas';


-- ============================================
-- TRIGGERS DE AUDITORÍA
-- ============================================

-- Función trigger: Auditar cambios en reservas
CREATE OR REPLACE FUNCTION auditar_cambios_reserva()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO auditoria_reservas (id_reserva, accion, datos_nuevos)
        VALUES (NEW.id_reserva, 'INSERT', row_to_json(NEW)::jsonb);
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO auditoria_reservas (id_reserva, accion, datos_anteriores, datos_nuevos)
        VALUES (NEW.id_reserva, 'UPDATE', row_to_json(OLD)::jsonb, row_to_json(NEW)::jsonb);
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO auditoria_reservas (id_reserva, accion, datos_anteriores)
        VALUES (OLD.id_reserva, 'DELETE', row_to_json(OLD)::jsonb);
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger de auditoría
CREATE TRIGGER trg_auditoria_reservas
AFTER INSERT OR UPDATE OR DELETE ON reserva
FOR EACH ROW
EXECUTE FUNCTION auditar_cambios_reserva();

COMMENT ON TRIGGER trg_auditoria_reservas ON reserva IS 'Audita todos los cambios en la tabla reservas';


-- ============================================
-- TRIGGERS DE VALIDACIÓN
-- ============================================

-- Función trigger: Validar fechas de reserva
CREATE OR REPLACE FUNCTION validar_fechas_reserva()
RETURNS TRIGGER AS $$
BEGIN
    -- Validar que fecha_fin sea mayor que fecha_ini
    IF NEW.fecha_fin <= NEW.fecha_ini THEN
        RAISE EXCEPTION 'La fecha de salida debe ser posterior a la fecha de entrada';
    END IF;
    
    -- Validar que las fechas no sean en el pasado
    IF NEW.fecha_ini < CURRENT_DATE THEN
        RAISE EXCEPTION 'No se pueden crear reservas con fechas en el pasado';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger de validación de fechas
CREATE TRIGGER trg_validar_fechas_reserva
BEFORE INSERT OR UPDATE ON reserva
FOR EACH ROW
EXECUTE FUNCTION validar_fechas_reserva();

COMMENT ON TRIGGER trg_validar_fechas_reserva ON reserva IS 'Valida que las fechas de reserva sean coherentes';


-- Función trigger: Validar capacidad de hotel
CREATE OR REPLACE FUNCTION validar_capacidad_hotel()
RETURNS TRIGGER AS $$
DECLARE
    v_capacidad INTEGER;
BEGIN
    -- Obtener capacidad de la habitación
    SELECT capacidad_personas INTO v_capacidad
    FROM habitacion
    WHERE id_hotel = NEW.id_hotel AND id_habitacion = NEW.id_habitacion;
    
    -- Validar que el número de huéspedes no exceda la capacidad
    IF NEW.num_huespedes > v_capacidad THEN
        RAISE EXCEPTION 'El número de huéspedes (%) excede la capacidad de la habitación (%)', 
            NEW.num_huespedes, v_capacidad;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger de validación de capacidad
CREATE TRIGGER trg_validar_capacidad_hotel
BEFORE INSERT OR UPDATE ON reserva
FOR EACH ROW
EXECUTE FUNCTION validar_capacidad_hotel();

COMMENT ON TRIGGER trg_validar_capacidad_hotel ON reserva IS 'Valida que el número de huéspedes no exceda la capacidad';


-- ============================================
-- TRIGGERS DE ACTUALIZACIÓN AUTOMÁTICA
-- ============================================

-- Función trigger: Actualizar estado de habitación
CREATE OR REPLACE FUNCTION actualizar_estado_habitacion_auto()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Al hacer check-in, marcar habitación como ocupada
        UPDATE habitacion 
        SET estado = 'Ocupada'
        WHERE id_hotel = NEW.id_hotel AND id_habitacion = NEW.id_habitacion;
    ELSIF TG_OP = 'UPDATE' AND NEW.fecha_checkout IS NOT NULL AND OLD.fecha_checkout IS NULL THEN
        -- Al hacer check-out, marcar habitación como disponible
        UPDATE habitacion 
        SET estado = 'Disponible'
        WHERE id_hotel = NEW.id_hotel AND id_habitacion = NEW.id_habitacion;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger de actualización automática
CREATE TRIGGER trg_actualizar_estado_habitacion
AFTER INSERT OR UPDATE ON registro
FOR EACH ROW
EXECUTE FUNCTION actualizar_estado_habitacion_auto();

COMMENT ON TRIGGER trg_actualizar_estado_habitacion ON registro IS 'Actualiza automáticamente el estado de la habitación';


-- Función trigger: Calcular costo automático de reserva
CREATE OR REPLACE FUNCTION calcular_costo_reserva_auto()
RETURNS TRIGGER AS $$
DECLARE
    v_precio_noche NUMERIC(10,2);
    v_dias INTEGER;
BEGIN
    -- Obtener precio por noche
    SELECT precio_noche INTO v_precio_noche
    FROM habitacion
    WHERE id_hotel = NEW.id_hotel AND id_habitacion = NEW.id_habitacion;
    
    -- Calcular días de estancia
    v_dias := NEW.fecha_fin - NEW.fecha_ini;
    
    -- Calcular y asignar costo si no está definido
    IF NEW.costo IS NULL OR NEW.costo = 0 THEN
        NEW.costo := v_precio_noche * v_dias;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger de cálculo automático
CREATE TRIGGER trg_calcular_costo_reserva
BEFORE INSERT OR UPDATE ON reserva
FOR EACH ROW
EXECUTE FUNCTION calcular_costo_reserva_auto();

COMMENT ON TRIGGER trg_calcular_costo_reserva ON reserva IS 'Calcula automáticamente el costo de la reserva si no está definido';


-- --Trigger: Cambiar el estado de una habitacoin (ocupada) cuando un cliente hace una reserva :  


CREATE OR REPLACE FUNCTION fn_marcar_habitacion_ocupada()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    -- Si NO esta cancelada.... marcamos ocupada-------
    IF NEW.estado IS NULL OR NEW.estado NOT ILIKE 'cancel%' THEN
        UPDATE HABITACION
           SET estado = 'ocupada'
         WHERE id_hotel = NEW.id_hotel
           AND id_habitacion = NEW.id_habitacion;
    END IF;
    RETURN NEW;
END;
$$;


-- ============================================
-- TRIGGERS DE INTEGRIDAD
-- ============================================

-- Función trigger: Validar disponibilidad antes de reservar
CREATE OR REPLACE FUNCTION validar_disponibilidad_trigger()
RETURNS TRIGGER AS $$
DECLARE
    v_conflictos INTEGER;
BEGIN
    -- Verificar si hay conflictos de fechas
    SELECT COUNT(*) INTO v_conflictos
    FROM reserva
    WHERE id_hotel = NEW.id_hotel 
      AND id_habitacion = NEW.id_habitacion
      AND id_reserva != COALESCE(NEW.id_reserva, 0)  -- Excluir la misma reserva en UPDATE
      AND estado IN ('Confirmada', 'Pendiente')
      AND (
          (NEW.fecha_ini BETWEEN fecha_ini AND fecha_fin) OR
          (NEW.fecha_fin BETWEEN fecha_ini AND fecha_fin) OR
          (fecha_ini BETWEEN NEW.fecha_ini AND NEW.fecha_fin)
      );
    
    IF v_conflictos > 0 THEN
        RAISE EXCEPTION 'La habitación no está disponible en las fechas seleccionadas';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger de validación de disponibilidad
CREATE TRIGGER trg_validar_disponibilidad
BEFORE INSERT OR UPDATE ON reserva
FOR EACH ROW
WHEN (NEW.estado IN ('Confirmada', 'Pendiente'))
EXECUTE FUNCTION validar_disponibilidad_trigger();

COMMENT ON TRIGGER trg_validar_disponibilidad ON reserva IS 'Valida que no haya conflictos de fechas al reservar';


-- ============================================
-- TRIGGERS DE REGISTRO AUTOMÁTICO
-- ============================================

-- Función trigger: Registrar fecha de última modificación
CREATE OR REPLACE FUNCTION actualizar_fecha_modificacion()
RETURNS TRIGGER AS $$
BEGIN
    -- Agregar campo updated_at si no existe (se debe crear en la tabla)
    -- NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Nota: Este trigger requiere agregar campo updated_at a las tablas


-- ============================================
-- MENSAJE DE CONFIRMACIÓN
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '✅ Triggers creados exitosamente';
    RAISE NOTICE '   - Triggers de auditoría: 1';
    RAISE NOTICE '   - Triggers de validación: 3';
    RAISE NOTICE '   - Triggers de actualización automática: 2';
    RAISE NOTICE '   - Triggers de integridad: 1';
    RAISE NOTICE '';
    RAISE NOTICE '📝 Nota: Tabla auditoria_reservas creada para registro de cambios';
END $$;

-- ============================================
-- FUNCIONALIDADES ADICIONALES
-- Sistema de Gestión Hotelera
-- Funciones, procedimientos y cursores adicionales
-- ============================================

SET client_encoding = 'UTF8';

-- ============================================
-- PROCEDIMIENTO: Cursor para revisar pagos pendientes
-- ============================================

CREATE OR REPLACE PROCEDURE sp_revisar_pagos_pendientes()
LANGUAGE plpgsql
AS $$
DECLARE
    pago_rec RECORD;
    cur_pagos CURSOR FOR
        SELECT r.id_reserva, r.id_cliente, r.costo, r.estado, r.fecha_reserva,
               c.nombre, c.apellido_paterno, c.email
        FROM reserva r
        JOIN cliente c ON r.id_cliente = c.id_cliente
        WHERE r.estado = 'Pendiente'
        ORDER BY r.fecha_reserva DESC;
    v_total DECIMAL(10,2) := 0;
    v_count INTEGER := 0;
BEGIN
    RAISE NOTICE '╔══════════════════════════════════════════════════════════╗';
    RAISE NOTICE '║         REPORTE DE PAGOS PENDIENTES                       ║';
    RAISE NOTICE '╚══════════════════════════════════════════════════════════╝';
    RAISE NOTICE '';
    
    OPEN cur_pagos;
    LOOP
        FETCH cur_pagos INTO pago_rec;
        EXIT WHEN NOT FOUND;
        
        v_count := v_count + 1;
        v_total := v_total + pago_rec.costo;

        RAISE NOTICE '💳 Reserva #% - Cliente: % %',
                     pago_rec.id_reserva, 
                     pago_rec.nombre,
                     pago_rec.apellido_paterno;
        RAISE NOTICE '   Email: % | Fecha: % | Monto: $%',
                     pago_rec.email,
                     pago_rec.fecha_reserva,
                     pago_rec.costo;
        RAISE NOTICE '   ────────────────────────────────────────';
    END LOOP;
    CLOSE cur_pagos;

    RAISE NOTICE '';
    RAISE NOTICE '📊 RESUMEN:';
    RAISE NOTICE '   Total pagos pendientes: %', v_count;
    RAISE NOTICE '   Monto total: $%', v_total;
END $$;

COMMENT ON PROCEDURE sp_revisar_pagos_pendientes IS 'Revisa y lista todos los pagos pendientes con cursor';


-- ============================================
-- TRIGGER: Marcar habitación como ocupada al crear reserva
-- ============================================

-- Nota: Este trigger ya existe con otra lógica en el archivo principal
-- Lo comentamos para evitar conflictos
-- El trigger original actualiza la habitación en el check-in, no en la reserva

/*
CREATE OR REPLACE FUNCTION fn_marcar_habitacion_ocupada()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    -- Marcar habitación como ocupada solo si la reserva está confirmada
    IF NEW.estado = 'Confirmada' THEN
        UPDATE habitacion
        SET estado = 'Ocupada'
        WHERE id_hotel = NEW.id_hotel
          AND id_habitacion = NEW.id_habitacion;
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_marcar_habitacion_ocupada
AFTER INSERT ON reserva
FOR EACH ROW
WHEN (NEW.estado = 'Confirmada')
EXECUTE FUNCTION fn_marcar_habitacion_ocupada();
*/

-- NOTA: El flujo correcto es:
-- 1. Reserva → estado 'Confirmada' → habitación sigue 'Disponible'
-- 2. Check-in → habitación cambia a 'Ocupada' (trigger existente)
-- 3. Check-out → habitación vuelve a 'Disponible' (trigger existente)


-- ============================================
-- MENSAJE DE CONFIRMACIÓN
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '✅ Funcionalidades adicionales creadas exitosamente';
    RAISE NOTICE '   - Procedimiento pagos pendientes con cursor: 1';
    RAISE NOTICE '';
    RAISE NOTICE '📝 Nota: Los triggers de habitación ya existen en 05-triggers.sql';
    RAISE NOTICE '   El flujo es: Reserva (Confirmada) → Check-in (Ocupada) → Check-out (Disponible)';
END $$;

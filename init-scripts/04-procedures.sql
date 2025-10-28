-- ============================================
-- PROCEDIMIENTOS ALMACENADOS - POSTGRESQL
-- Sistema de Gestión Hotelera
-- ============================================

-- Configuración
SET client_encoding = 'UTF8';

-- ============================================
-- PROCEDIMIENTOS DE NEGOCIO
-- ============================================

-- Procedimiento: Realizar check-in
CREATE OR REPLACE PROCEDURE realizar_checkin(
    p_id_reserva INTEGER,
    p_fecha_checkin DATE DEFAULT CURRENT_DATE,
    p_hora_checkin TIME DEFAULT CURRENT_TIME
) AS $$
DECLARE
    v_id_hotel INTEGER;
    v_id_habitacion INTEGER;
    v_existe_registro INTEGER;
BEGIN
    -- Obtener datos de la reserva
    SELECT id_hotel, id_habitacion INTO v_id_hotel, v_id_habitacion
    FROM reserva
    WHERE id_reserva = p_id_reserva;
    
    IF v_id_hotel IS NULL THEN
        RAISE EXCEPTION 'Reserva % no encontrada', p_id_reserva;
    END IF;
    
    -- Verificar si ya existe un registro
    SELECT COUNT(*) INTO v_existe_registro
    FROM registro
    WHERE id_reserva = p_id_reserva;
    
    IF v_existe_registro > 0 THEN
        RAISE EXCEPTION 'Ya existe un registro de check-in para la reserva %', p_id_reserva;
    END IF;
    
    -- Insertar registro de check-in
    INSERT INTO registro (id_reserva, id_hotel, id_habitacion, fecha_checkin, hora_checkin)
    VALUES (p_id_reserva, v_id_hotel, v_id_habitacion, p_fecha_checkin, p_hora_checkin);
    
    -- Actualizar estado de la reserva
    UPDATE reserva SET estado = 'Completada' WHERE id_reserva = p_id_reserva;
    
    -- Actualizar estado de la habitación
    UPDATE habitacion SET estado = 'Ocupada' 
    WHERE id_hotel = v_id_hotel AND id_habitacion = v_id_habitacion;
    
    RAISE NOTICE '✅ Check-in realizado exitosamente para reserva %', p_id_reserva;
END;
$$ LANGUAGE plpgsql;

COMMENT ON PROCEDURE realizar_checkin IS 'Realiza el proceso de check-in para una reserva';


-- Procedimiento: Realizar check-out
CREATE OR REPLACE PROCEDURE realizar_checkout(
    p_id_registro INTEGER,
    p_fecha_checkout DATE DEFAULT CURRENT_DATE,
    p_hora_checkout TIME DEFAULT CURRENT_TIME
) AS $$
DECLARE
    v_id_hotel INTEGER;
    v_id_habitacion INTEGER;
BEGIN
    -- Obtener datos del registro
    SELECT id_hotel, id_habitacion INTO v_id_hotel, v_id_habitacion
    FROM registro
    WHERE id_registro = p_id_registro;
    
    IF v_id_hotel IS NULL THEN
        RAISE EXCEPTION 'Registro % no encontrado', p_id_registro;
    END IF;
    
    -- Actualizar registro con datos de check-out
    UPDATE registro 
    SET fecha_checkout = p_fecha_checkout, 
        hora_checkout = p_hora_checkout
    WHERE id_registro = p_id_registro;
    
    -- Actualizar estado de la habitación
    UPDATE habitacion SET estado = 'Disponible'
    WHERE id_hotel = v_id_hotel AND id_habitacion = v_id_habitacion;
    
    RAISE NOTICE '✅ Check-out realizado exitosamente para registro %', p_id_registro;
END;
$$ LANGUAGE plpgsql;

COMMENT ON PROCEDURE realizar_checkout IS 'Realiza el proceso de check-out para un registro';


-- Procedimiento: Crear reserva completa
CREATE OR REPLACE PROCEDURE crear_reserva(
    p_id_cliente INTEGER,
    p_id_hotel INTEGER,
    p_id_habitacion INTEGER,
    p_fecha_ini DATE,
    p_fecha_fin DATE,
    p_num_huespedes INTEGER,
    OUT p_id_reserva INTEGER,
    OUT p_costo NUMERIC(10,2)
) AS $$
BEGIN
    -- Validar disponibilidad
    IF NOT validar_disponibilidad(p_id_hotel, p_id_habitacion, p_fecha_ini, p_fecha_fin) THEN
        RAISE EXCEPTION 'La habitación no está disponible en las fechas solicitadas';
    END IF;
    
    -- Validar capacidad
    IF NOT validar_capacidad_huespedes(p_id_hotel, p_id_habitacion, p_num_huespedes) THEN
        RAISE EXCEPTION 'El número de huéspedes excede la capacidad de la habitación';
    END IF;
    
    -- Calcular costo
    p_costo := calcular_costo_reserva(p_id_hotel, p_id_habitacion, p_fecha_ini, p_fecha_fin);
    
    -- Insertar reserva
    INSERT INTO reserva (
        id_cliente, id_hotel, id_habitacion, 
        fecha_reserva, fecha_ini, fecha_fin, 
        num_huespedes, costo, estado, observaciones
    ) VALUES (
        p_id_cliente, p_id_hotel, p_id_habitacion,
        CURRENT_DATE, p_fecha_ini, p_fecha_fin,
        p_num_huespedes, p_costo, 'Confirmada',
        'Código: ' || generar_codigo_confirmacion()
    ) RETURNING id_reserva INTO p_id_reserva;
    
    RAISE NOTICE '✅ Reserva % creada exitosamente. Costo: $%', p_id_reserva, p_costo;
END;
$$ LANGUAGE plpgsql;

COMMENT ON PROCEDURE crear_reserva IS 'Crea una nueva reserva validando disponibilidad y calculando costos';


-- ============================================
-- PROCEDIMIENTOS DE REPORTES
-- ============================================

-- Procedimiento: Reporte de ocupación mensual
CREATE OR REPLACE PROCEDURE generar_reporte_ocupacion(
    p_id_hotel INTEGER,
    p_año INTEGER,
    p_mes INTEGER
) AS $$
DECLARE
    v_ocupacion_promedio NUMERIC(5,2);
    v_total_reservas INTEGER;
    v_ingresos_totales NUMERIC(10,2);
BEGIN
    -- Calcular ocupación promedio del mes
    SELECT AVG(ocupacion) INTO v_ocupacion_promedio
    FROM (
        SELECT obtener_ocupacion_hotel(p_id_hotel, fecha::DATE) as ocupacion
        FROM generate_series(
            make_date(p_año, p_mes, 1),
            make_date(p_año, p_mes, 1) + INTERVAL '1 month' - INTERVAL '1 day',
            '1 day'::interval
        ) AS fecha
    ) AS ocupaciones_diarias;
    
    -- Contar total de reservas
    SELECT COUNT(*), COALESCE(SUM(costo), 0) 
    INTO v_total_reservas, v_ingresos_totales
    FROM reserva
    WHERE id_hotel = p_id_hotel
      AND EXTRACT(YEAR FROM fecha_reserva) = p_año
      AND EXTRACT(MONTH FROM fecha_reserva) = p_mes;
    
    -- Mostrar reporte
    RAISE NOTICE '╔════════════════════════════════════════╗';
    RAISE NOTICE '║    REPORTE DE OCUPACIÓN - Hotel %     ║', p_id_hotel;
    RAISE NOTICE '╚════════════════════════════════════════╝';
    RAISE NOTICE 'Mes: %/%', p_mes, p_año;
    RAISE NOTICE 'Ocupación promedio: %%%', ROUND(v_ocupacion_promedio, 2);
    RAISE NOTICE 'Total reservas: %', v_total_reservas;
    RAISE NOTICE 'Ingresos totales: $%', v_ingresos_totales;
END;
$$ LANGUAGE plpgsql;

COMMENT ON PROCEDURE generar_reporte_ocupacion IS 'Genera un reporte de ocupación mensual para un hotel';


-- ============================================
-- PROCEDIMIENTOS CON CURSORES EXPLÍCITOS
-- ============================================

-- Procedimiento: Listar reservas de un cliente usando CURSOR
CREATE OR REPLACE PROCEDURE listar_reservas_cliente(
    p_id_cliente INTEGER
) AS $$
DECLARE
    -- Declaración de cursor explícito
    cur_reservas CURSOR FOR
        SELECT r.id_reserva, r.fecha_ini, r.fecha_fin, r.estado, r.costo,
               h.nombre as hotel_nombre, hab.num_habitacion, hab.tipo
        FROM reserva r
        JOIN hotel h ON r.id_hotel = h.id_hotel
        JOIN habitacion hab ON r.id_hotel = hab.id_hotel AND r.id_habitacion = hab.id_habitacion
        WHERE r.id_cliente = p_id_cliente
        ORDER BY r.fecha_reserva DESC;
    
    -- Variables para almacenar datos del cursor
    v_id_reserva INTEGER;
    v_fecha_ini DATE;
    v_fecha_fin DATE;
    v_estado VARCHAR(20);
    v_costo NUMERIC(10,2);
    v_hotel VARCHAR(100);
    v_num_hab INTEGER;
    v_tipo VARCHAR(50);
    v_count INTEGER := 0;
BEGIN
    RAISE NOTICE '╔══════════════════════════════════════════════════════════╗';
    RAISE NOTICE '║  RESERVAS DEL CLIENTE %                                 ║', p_id_cliente;
    RAISE NOTICE '╚══════════════════════════════════════════════════════════╝';
    RAISE NOTICE '';
    
    -- Abrir cursor
    OPEN cur_reservas;
    
    -- Loop para recorrer el cursor
    LOOP
        -- Fetch siguiente registro
        FETCH cur_reservas INTO v_id_reserva, v_fecha_ini, v_fecha_fin, 
                                v_estado, v_costo, v_hotel, v_num_hab, v_tipo;
        
        -- Salir si no hay más registros
        EXIT WHEN NOT FOUND;
        
        v_count := v_count + 1;
        
        -- Mostrar información de la reserva
        RAISE NOTICE '🏨 Reserva #%', v_id_reserva;
        RAISE NOTICE '   Hotel: %', v_hotel;
        RAISE NOTICE '   Habitación: % - %', v_num_hab, v_tipo;
        RAISE NOTICE '   Fechas: % a %', v_fecha_ini, v_fecha_fin;
        RAISE NOTICE '   Estado: % | Costo: $%', v_estado, v_costo;
        RAISE NOTICE '   ────────────────────────────────────────';
    END LOOP;
    
    -- Cerrar cursor
    CLOSE cur_reservas;
    
    RAISE NOTICE '';
    RAISE NOTICE '✅ Total de reservas encontradas: %', v_count;
END;
$$ LANGUAGE plpgsql;

COMMENT ON PROCEDURE listar_reservas_cliente IS 'Lista todas las reservas de un cliente usando cursor explícito';


-- Procedimiento: Procesar check-outs pendientes con CURSOR FOR UPDATE
CREATE OR REPLACE PROCEDURE procesar_checkouts_pendientes() AS $$
DECLARE
    -- Cursor con FOR UPDATE para bloquear registros
    cur_pendientes CURSOR FOR
        SELECT r.id_registro, r.id_hotel, r.id_habitacion, 
               res.id_reserva, res.fecha_fin
        FROM registro r
        JOIN reserva res ON r.id_reserva = res.id_reserva
        WHERE r.fecha_checkout IS NULL
          AND res.fecha_fin < CURRENT_DATE
        ORDER BY res.fecha_fin
        FOR UPDATE OF r NOWAIT;
    
    v_registro RECORD;
    v_procesados INTEGER := 0;
    v_errores INTEGER := 0;
BEGIN
    RAISE NOTICE '🔄 Procesando check-outs pendientes...';
    RAISE NOTICE '';
    
    -- Recorrer cursor con FOR LOOP (forma compacta)
    FOR v_registro IN cur_pendientes LOOP
        BEGIN
            -- Realizar check-out automático
            UPDATE registro
            SET fecha_checkout = CURRENT_DATE,
                hora_checkout = CURRENT_TIME
            WHERE CURRENT OF cur_pendientes;
            
            -- Liberar habitación
            UPDATE habitacion
            SET estado = 'Disponible'
            WHERE id_hotel = v_registro.id_hotel
              AND id_habitacion = v_registro.id_habitacion;
            
            v_procesados := v_procesados + 1;
            
            RAISE NOTICE '✅ Check-out procesado - Registro: % | Reserva: %', 
                         v_registro.id_registro, v_registro.id_reserva;
        EXCEPTION
            WHEN OTHERS THEN
                v_errores := v_errores + 1;
                RAISE NOTICE '❌ Error procesando registro %: %', 
                             v_registro.id_registro, SQLERRM;
        END;
    END LOOP;
    
    RAISE NOTICE '';
    RAISE NOTICE '📊 Resumen:';
    RAISE NOTICE '   Procesados exitosamente: %', v_procesados;
    RAISE NOTICE '   Errores: %', v_errores;
END;
$$ LANGUAGE plpgsql;

COMMENT ON PROCEDURE procesar_checkouts_pendientes IS 'Procesa check-outs vencidos usando cursor con FOR UPDATE';


-- Procedimiento: Generar reporte detallado con cursor anidado
CREATE OR REPLACE PROCEDURE generar_reporte_detallado_hotel(
    p_id_hotel INTEGER
) AS $$
DECLARE
    -- Cursor principal: habitaciones
    cur_habitaciones CURSOR FOR
        SELECT id_habitacion, num_habitacion, tipo, precio, capacidad, estado
        FROM habitacion
        WHERE id_hotel = p_id_hotel
        ORDER BY num_habitacion;
    
    v_hab RECORD;
    v_res RECORD;
    v_total_habitaciones INTEGER := 0;
    v_ocupadas INTEGER := 0;
    v_ingresos_totales NUMERIC(10,2) := 0;
    
    -- Cursor secundario: reservas activas por habitación
    cur_reservas CURSOR (p_id_hab INTEGER) FOR
        SELECT id_reserva, fecha_ini, fecha_fin, num_huespedes, costo, estado
        FROM reserva
        WHERE id_hotel = p_id_hotel
          AND id_habitacion = p_id_hab
          AND estado IN ('Confirmada', 'Completada')
          AND fecha_fin >= CURRENT_DATE
        ORDER BY fecha_ini;
BEGIN
    RAISE NOTICE '╔══════════════════════════════════════════════════════════╗';
    RAISE NOTICE '║           REPORTE DETALLADO DE HOTEL #%                 ║', p_id_hotel;
    RAISE NOTICE '╚══════════════════════════════════════════════════════════╝';
    RAISE NOTICE '';
    
    -- Recorrer todas las habitaciones
    FOR v_hab IN cur_habitaciones LOOP
        v_total_habitaciones := v_total_habitaciones + 1;
        
        RAISE NOTICE '🏠 Habitación % - %', v_hab.num_habitacion, v_hab.tipo;
        RAISE NOTICE '   Precio: $% | Capacidad: % | Estado: %', 
                     v_hab.precio, v_hab.capacidad, v_hab.estado;
        
        -- Cursor anidado: buscar reservas para esta habitación
        DECLARE
            v_tiene_reservas BOOLEAN := FALSE;
        BEGIN
            FOR v_res IN cur_reservas(v_hab.id_habitacion) LOOP
                IF NOT v_tiene_reservas THEN
                    RAISE NOTICE '   📋 Reservas activas:';
                    v_tiene_reservas := TRUE;
                END IF;
                
                RAISE NOTICE '      • Reserva #%: % a % (%)', 
                             v_res.id_reserva, v_res.fecha_ini, v_res.fecha_fin, v_res.estado;
                RAISE NOTICE '        Huéspedes: % | Costo: $%', 
                             v_res.num_huespedes, v_res.costo;
                
                v_ingresos_totales := v_ingresos_totales + v_res.costo;
            END LOOP;
            
            IF NOT v_tiene_reservas THEN
                RAISE NOTICE '   ℹ️  Sin reservas activas';
            END IF;
        END;
        
        IF v_hab.estado = 'Ocupada' THEN
            v_ocupadas := v_ocupadas + 1;
        END IF;
        
        RAISE NOTICE '   ────────────────────────────────────────';
    END LOOP;
    
    RAISE NOTICE '';
    RAISE NOTICE '📊 RESUMEN GENERAL:';
    RAISE NOTICE '   Total habitaciones: %', v_total_habitaciones;
    RAISE NOTICE '   Ocupadas: % (%%%)', v_ocupadas, 
                 ROUND((v_ocupadas::NUMERIC / v_total_habitaciones) * 100, 2);
    RAISE NOTICE '   Ingresos proyectados: $%', v_ingresos_totales;
END;
$$ LANGUAGE plpgsql;

COMMENT ON PROCEDURE generar_reporte_detallado_hotel IS 'Genera reporte completo de hotel usando cursores anidados';


-- Procedimiento: Cursor con scroll (navegación bidireccional)
CREATE OR REPLACE PROCEDURE analizar_ocupacion_historica(
    p_id_hotel INTEGER,
    p_meses_atras INTEGER DEFAULT 6
) AS $$
DECLARE
    -- Cursor scrollable (permite moverse adelante y atrás)
    cur_meses SCROLL CURSOR FOR
        SELECT 
            EXTRACT(YEAR FROM fecha_ini)::INTEGER as año,
            EXTRACT(MONTH FROM fecha_ini)::INTEGER as mes,
            COUNT(*) as total_reservas,
            SUM(costo) as ingresos,
            AVG(num_huespedes) as promedio_huespedes
        FROM reserva
        WHERE id_hotel = p_id_hotel
          AND fecha_ini >= CURRENT_DATE - (p_meses_atras || ' months')::INTERVAL
        GROUP BY EXTRACT(YEAR FROM fecha_ini), EXTRACT(MONTH FROM fecha_ini)
        ORDER BY año DESC, mes DESC;
    
    v_mes RECORD;
    v_count INTEGER := 0;
    v_mejor_mes RECORD;
    v_mejor_ingresos NUMERIC(10,2) := 0;
BEGIN
    RAISE NOTICE '📈 ANÁLISIS DE OCUPACIÓN HISTÓRICA - Hotel %', p_id_hotel;
    RAISE NOTICE '    Período: Últimos % meses', p_meses_atras;
    RAISE NOTICE '════════════════════════════════════════════════════════';
    
    OPEN cur_meses;
    
    -- Primera pasada: mostrar datos y encontrar mejor mes
    LOOP
        FETCH cur_meses INTO v_mes;
        EXIT WHEN NOT FOUND;
        
        v_count := v_count + 1;
        
        RAISE NOTICE '📅 %/% | Reservas: % | Ingresos: $% | Huéspedes Prom: %',
                     v_mes.mes, v_mes.año, v_mes.total_reservas, 
                     COALESCE(v_mes.ingresos, 0), ROUND(v_mes.promedio_huespedes, 1);
        
        -- Guardar mejor mes
        IF COALESCE(v_mes.ingresos, 0) > v_mejor_ingresos THEN
            v_mejor_ingresos := COALESCE(v_mes.ingresos, 0);
            v_mejor_mes := v_mes;
        END IF;
    END LOOP;
    
    -- Segunda pasada: volver al principio y analizar tendencia
    IF v_count > 0 THEN
        RAISE NOTICE '';
        RAISE NOTICE '⭐ MEJOR MES: %/% con $% en ingresos',
                     v_mejor_mes.mes, v_mejor_mes.año, v_mejor_ingresos;
        
        -- Mover cursor al último registro (más antiguo)
        MOVE LAST FROM cur_meses;
        FETCH cur_meses INTO v_mes;
        
        RAISE NOTICE '📊 Mes más antiguo analizado: %/% ($%)',
                     v_mes.mes, v_mes.año, COALESCE(v_mes.ingresos, 0);
    ELSE
        RAISE NOTICE '⚠️  No hay datos en el período especificado';
    END IF;
    
    CLOSE cur_meses;
END;
$$ LANGUAGE plpgsql;

COMMENT ON PROCEDURE analizar_ocupacion_historica IS 'Analiza ocupación histórica usando cursor scrollable';


-- ============================================
-- PROCEDIMIENTOS DE MANTENIMIENTO
-- ============================================

-- Procedimiento: Limpiar reservas canceladas antiguas
CREATE OR REPLACE PROCEDURE limpiar_reservas_viejas(
    p_dias_antiguedad INTEGER DEFAULT 365
) AS $$
DECLARE
    v_count INTEGER;
BEGIN
    -- Eliminar reservas canceladas con más de X días
    DELETE FROM reserva
    WHERE estado = 'Cancelada'
      AND fecha_reserva < CURRENT_DATE - p_dias_antiguedad;
    
    GET DIAGNOSTICS v_count = ROW_COUNT;
    
    RAISE NOTICE '✅ % reservas canceladas antiguas eliminadas', v_count;
END;
$$ LANGUAGE plpgsql;

COMMENT ON PROCEDURE limpiar_reservas_viejas IS 'Elimina reservas canceladas con más de N días de antigüedad';


-- Procedimiento: Actualizar estado de habitaciones
CREATE OR REPLACE PROCEDURE actualizar_estado_habitaciones() AS $$
DECLARE
    v_count INTEGER;
BEGIN
    -- Liberar habitaciones de check-outs completados
    UPDATE habitacion h
    SET estado = 'Disponible'
    FROM registro r
    WHERE h.id_hotel = r.id_hotel
      AND h.id_habitacion = r.id_habitacion
      AND h.estado = 'Ocupada'
      AND r.fecha_checkout IS NOT NULL
      AND r.fecha_checkout < CURRENT_DATE;
    
    GET DIAGNOSTICS v_count = ROW_COUNT;
    
    RAISE NOTICE '✅ % habitaciones liberadas', v_count;
END;
$$ LANGUAGE plpgsql;

COMMENT ON PROCEDURE actualizar_estado_habitaciones IS 'Actualiza el estado de habitaciones basado en registros de check-out';


------

--- PROCEDIMIENTO DEL LA BUSQUEDA DE L HTOEL

CREATE OR REPLACE PROCEDURE sp_consultar_habitaciones_hotel(
    p_id_hotel INTEGER,
    INOUT p_cursor REFCURSOR -- Usamos INOUT para "devolver" el cursor
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Validar si el hotel existe
    IF NOT EXISTS (SELECT 1 FROM HOTEL WHERE id_hotel = p_id_hotel) THEN
        RAISE EXCEPTION 'El hotel con ID % no existe.', p_id_hotel;
    END IF;

    -- Abrir el cursor 'p_cursor' con la consulta de habitaciones
    OPEN p_cursor FOR
        SELECT
            h.id_habitacion,
            h.tipo,
            h.capacidad_personas,
            h.precio_noche,
            h.estado
        FROM
            HABITACION h
        WHERE
            h.id_hotel = p_id_hotel
        ORDER BY
            h.id_habitacion;
END;
$$;



-- ============================================
-- MENSAJE DE CONFIRMACIÓN
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '✅ Procedimientos creados exitosamente';
    RAISE NOTICE '   - Procedimientos de negocio: 3';
    RAISE NOTICE '   - Procedimientos de reportes: 1';
    RAISE NOTICE '   - Procedimientos con cursores: 4 ⭐';
    RAISE NOTICE '   - Procedimientos de mantenimiento: 2';
    RAISE NOTICE '';
    RAISE NOTICE '📋 Tipos de cursores implementados:';
    RAISE NOTICE '   • Cursor básico (OPEN/FETCH/CLOSE)';
    RAISE NOTICE '   • Cursor FOR UPDATE (bloqueo de registros)';
    RAISE NOTICE '   • Cursor anidado (cursor dentro de cursor)';
    RAISE NOTICE '   • Cursor SCROLL (navegación bidireccional)';
END $$;

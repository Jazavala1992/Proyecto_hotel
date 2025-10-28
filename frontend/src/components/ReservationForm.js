import React, { useState, useEffect } from 'react';
import { getHotels, getHotelRooms, createReservation } from '../api';

function ReservationForm() {
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [allRooms, setAllRooms] = useState([]); // Todas las habitaciones para la tabla
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    // Datos del cliente
    cliente_nombre: '',
    cliente_apellido_paterno: '',
    cliente_apellido_materno: '',
    cliente_fecha_naci: '',
    // Datos de la reserva
    id_hotel: '',
    id_habitacion: '',
    fecha_ini: '',
    fecha_fin: '',
    num_huespedes: 1
  });

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      const response = await getHotels();
      setHotels(response.data.data);
    } catch (err) {
      console.error('Error loading hotels:', err);
    }
  };

  const handleHotelChange = async (hotelId) => {
    setFormData({ ...formData, id_hotel: hotelId, id_habitacion: '' });
    
    if (hotelId) {
      try {
        const response = await getHotelRooms(hotelId);
        const allRoomsData = response.data.data;
        
        // Guardar todas las habitaciones para la tabla
        setAllRooms(allRoomsData);
        
        // Filtrar solo disponibles para el selector
        setRooms(allRoomsData.filter(room => room.estado === 'Disponible'));
      } catch (err) {
        console.error('Error loading rooms:', err);
        setRooms([]);
        setAllRooms([]);
      }
    } else {
      setRooms([]);
      setAllRooms([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      const response = await createReservation(formData);
      
      const mensaje = response.data.nuevo_cliente 
        ? `✅ Cliente y Reserva creados! Reserva #${response.data.data.id_reserva}, Cliente: ${response.data.data.cliente_nombre}, Costo: $${response.data.data.costo}`
        : `✅ Reserva #${response.data.data.id_reserva} creada exitosamente! Costo: $${response.data.data.costo}`;
      
      setSuccess(mensaje);
      
      // Guardar el hotel seleccionado antes de resetear
      const hotelSeleccionado = formData.id_hotel;
      
      // Reset form
      setFormData({
        cliente_nombre: '',
        cliente_apellido_paterno: '',
        cliente_apellido_materno: '',
        cliente_fecha_naci: '',
        id_hotel: hotelSeleccionado, // Mantener el hotel seleccionado
        id_habitacion: '',
        fecha_ini: '',
        fecha_fin: '',
        num_huespedes: 1
      });
      
      // Recargar habitaciones del hotel para ver el cambio de estado
      if (hotelSeleccionado) {
        await handleHotelChange(hotelSeleccionado);
      }
      
      setTimeout(() => setSuccess(null), 8000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear reserva');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>📝 Nueva Reserva</h2>
      <p style={{ marginBottom: '1.5rem', color: '#666' }}>
        Crea un cliente nuevo automáticamente o usa uno existente
      </p>

      {success && (
        <div className="success-message" style={{ 
          padding: '1rem', 
          background: '#d4edda', 
          color: '#155724', 
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          {success}
        </div>
      )}

      {error && (
        <div className="error" style={{ marginBottom: '1rem' }}>{error}</div>
      )}

      <form onSubmit={handleSubmit} className="form">
        {/* SECCIÓN: DATOS DEL CLIENTE */}
        <div style={{ 
          background: '#f8f9fa', 
          padding: '1.5rem', 
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>👤 Datos del Cliente</h3>
          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
            Ingresa los datos del cliente - se creará automáticamente si no existe
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Nombre: *</label>
              <input
                type="text"
                name="cliente_nombre"
                value={formData.cliente_nombre}
                onChange={handleChange}
                required
                placeholder="Ej: Juan"
              />
            </div>

            <div className="form-group">
              <label>Apellido Paterno: *</label>
              <input
                type="text"
                name="cliente_apellido_paterno"
                value={formData.cliente_apellido_paterno}
                onChange={handleChange}
                required
                placeholder="Ej: García"
              />
            </div>

            <div className="form-group">
              <label>Apellido Materno:</label>
              <input
                type="text"
                name="cliente_apellido_materno"
                value={formData.cliente_apellido_materno}
                onChange={handleChange}
                placeholder="Ej: López (opcional)"
              />
            </div>

            <div className="form-group">
              <label>Fecha de Nacimiento:</label>
              <input
                type="date"
                name="cliente_fecha_naci"
                value={formData.cliente_fecha_naci}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        </div>

        {/* SECCIÓN: DATOS DE LA RESERVA */}
        <div style={{ 
          background: '#e8f4fd', 
          padding: '1.5rem', 
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>🏨 Datos de la Reserva</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Hotel: *</label>
              <select
                name="id_hotel"
                value={formData.id_hotel}
                onChange={(e) => handleHotelChange(e.target.value)}
                required
              >
                <option value="">-- Selecciona un hotel --</option>
                {hotels.map(hotel => (
                  <option key={hotel.id_hotel} value={hotel.id_hotel}>
                    {hotel.nombre} - {hotel.ciudad}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Habitación: *</label>
              <select
                name="id_habitacion"
                value={formData.id_habitacion}
                onChange={handleChange}
                required
                disabled={!formData.id_hotel}
              >
                <option value="">-- Selecciona una habitación --</option>
                {rooms.map(room => (
                  <option key={room.id_habitacion} value={room.id_habitacion}>
                    #{room.id_habitacion} - {room.tipo} - ${room.precio_noche}/noche - Cap: {room.capacidad_personas}
                  </option>
                ))}
              </select>
              {formData.id_hotel && rooms.length === 0 && (
                <small style={{ color: '#999' }}>No hay habitaciones disponibles</small>
              )}
            </div>

            <div className="form-group">
              <label>Fecha de Inicio: *</label>
              <input
                type="date"
                name="fecha_ini"
                value={formData.fecha_ini}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="form-group">
              <label>Fecha de Fin: *</label>
              <input
                type="date"
                name="fecha_fin"
                value={formData.fecha_fin}
                onChange={handleChange}
                required
                min={formData.fecha_ini || new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="form-group">
              <label>Número de Huéspedes: *</label>
              <input
                type="number"
                name="num_huespedes"
                value={formData.num_huespedes}
                onChange={handleChange}
                required
                min="1"
                max="10"
              />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={loading}
          style={{ marginTop: '1rem', width: '100%' }}
        >
          {loading ? '⏳ Creando Reserva...' : '✓ Crear Cliente y Reserva'}
        </button>
      </form>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#fff3cd', borderRadius: '8px' }}>
        <h4>ℹ️ Información Importante</h4>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', color: '#856404' }}>
          <li>✓ Se creará un <strong>nuevo cliente</strong> automáticamente con los datos ingresados</li>
          <li>✓ El costo se calcula automáticamente según las noches y el tipo de habitación</li>
          <li>✓ La reserva quedará en estado <strong>"Pendiente"</strong></li>
          <li>💡 <strong>Tip:</strong> Selecciona un hotel para ver todas sus habitaciones</li>
        </ul>
      </div>

      {/* TABLA DE HABITACIONES */}
      {allRooms.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>🛏️ Habitaciones del Hotel Seleccionado</h3>
          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
            📊 Total: {allRooms.length} habitaciones | 
            ✅ Disponibles: {allRooms.filter(r => r.estado === 'Disponible').length} | 
            🔴 Ocupadas: {allRooms.filter(r => r.estado === 'Ocupada').length} |
            🔧 Mantenimiento: {allRooms.filter(r => r.estado === 'Mantenimiento').length}
          </p>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              background: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <thead>
                <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>#</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Habitación</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Tipo</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600' }}>Capacidad</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontWeight: '600' }}>Precio/Noche</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600' }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {allRooms.map((room, index) => (
                  <tr 
                    key={room.id_habitacion} 
                    style={{ 
                      borderBottom: '1px solid #dee2e6',
                      background: index % 2 === 0 ? 'white' : '#f8f9fa',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#e9ecef'}
                    onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? 'white' : '#f8f9fa'}
                  >
                    <td style={{ padding: '12px', color: '#666' }}>{index + 1}</td>
                    <td style={{ padding: '12px', fontWeight: '500' }}>
                      #{room.id_habitacion}
                    </td>
                    <td style={{ padding: '12px' }}>{room.tipo}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{ 
                        background: '#e7f3ff', 
                        padding: '4px 8px', 
                        borderRadius: '4px',
                        fontSize: '0.9rem'
                      }}>
                        👥 {room.capacidad_personas}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: '500' }}>
                      ${parseFloat(room.precio_noche).toFixed(2)}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        background: 
                          room.estado === 'Disponible' ? '#d4edda' :
                          room.estado === 'Ocupada' ? '#f8d7da' :
                          '#fff3cd',
                        color:
                          room.estado === 'Disponible' ? '#155724' :
                          room.estado === 'Ocupada' ? '#721c24' :
                          '#856404'
                      }}>
                        {room.estado === 'Disponible' ? '✅ Disponible' :
                         room.estado === 'Ocupada' ? '🔴 Ocupada' :
                         '🔧 Mantenimiento'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={{ 
            marginTop: '1rem', 
            padding: '1rem', 
            background: '#e7f3ff', 
            borderRadius: '8px',
            fontSize: '0.9rem',
            color: '#004085'
          }}>
            💡 <strong>Observa el cambio:</strong> Al crear una reserva, la tabla se actualizará 
            automáticamente mostrando el cambio de estado de la habitación seleccionada.
          </div>
        </div>
      )}
    </div>
  );
}

export default ReservationForm;

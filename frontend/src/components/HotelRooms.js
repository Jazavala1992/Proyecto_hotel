import React, { useState, useEffect } from 'react';
import { getHotelRooms } from '../api';

function HotelRooms({ hotel }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (hotel) {
      loadRooms();
    }
  }, [hotel]);

  const loadRooms = async () => {
    try {
      setLoading(true);
      const response = await getHotelRooms(hotel.id_hotel);
      setRooms(response.data.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar habitaciones');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getEstadoBadge = (estado) => {
    const badges = {
      'Disponible': 'success',
      'Ocupada': 'danger',
      'Mantenimiento': 'warning'
    };
    return badges[estado] || 'info';
  };

  if (loading) return <div className="loading">Cargando habitaciones...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="card">
      <h2>🛏️ Habitaciones - {hotel.nombre}</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        📍 {hotel.direccion}, {hotel.ciudad}
      </p>

      {rooms.length === 0 ? (
        <p>No hay habitaciones disponibles</p>
      ) : (
        <div className="grid">
          {rooms.map(room => (
            <div key={room.id_habitacion} className="grid-item">
              <h3>Habitación #{room.num_habitacion}</h3>
              <p><strong>Tipo:</strong> {room.tipo}</p>
              <p><strong>Capacidad:</strong> {room.capacidad} personas</p>
              <p><strong>Precio:</strong> ${parseFloat(room.precio).toFixed(2)} / noche</p>
              <div style={{ marginTop: '1rem' }}>
                <span className={`badge ${getEstadoBadge(room.estado)}`}>
                  {room.estado}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="stats">
        <div className="stat-card">
          <h3>{rooms.length}</h3>
          <p>Total Habitaciones</p>
        </div>
        <div className="stat-card">
          <h3>{rooms.filter(r => r.estado === 'Disponible').length}</h3>
          <p>Disponibles</p>
        </div>
        <div className="stat-card">
          <h3>{rooms.filter(r => r.estado === 'Ocupada').length}</h3>
          <p>Ocupadas</p>
        </div>
      </div>
    </div>
  );
}

export default HotelRooms;

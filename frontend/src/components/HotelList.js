import React, { useState, useEffect } from 'react';
import { getHotels } from '../api';

function HotelList({ onSelectHotel }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      setLoading(true);
      const response = await getHotels();
      setHotels(response.data.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar hoteles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Cargando hoteles...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="card">
      <h2>🏨 Lista de Hoteles</h2>
      
      <div className="grid">
        {hotels.map(hotel => (
          <div 
            key={hotel.id_hotel} 
            className="grid-item"
            onClick={() => onSelectHotel(hotel)}
          >
            <h3>{hotel.nombre}</h3>
            <p>📍 {hotel.direccion}, {hotel.ciudad}</p>
            <p>📞 {hotel.telefono}</p>
            <p>📧 {hotel.email}</p>
            <div style={{ marginTop: '1rem' }}>
              <span className="badge info">
                {hotel.total_habitaciones} habitaciones
              </span>
              {' '}
              <span className="badge success">
                {hotel.habitaciones_disponibles} disponibles
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotelList;

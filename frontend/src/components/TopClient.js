import React, { useState, useEffect } from 'react';
import { getHotels, getTopClient } from '../api';

function TopClient() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState('');
  const [topClient, setTopClient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      const response = await getHotels();
      setHotels(response.data.data);
      if (response.data.data.length > 0) {
        setSelectedHotelId(response.data.data[0].id_hotel);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadTopClient = async () => {
    if (!selectedHotelId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await getTopClient(selectedHotelId);
      
      if (response.data.data === null) {
        setError('No se encontraron reservas para este hotel');
        setTopClient(null);
      } else {
        setTopClient(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error al obtener cliente recurrente');
      setTopClient(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadTopClient();
  };

  return (
    <div className="card">
      <h2>⭐ Cliente Más Recurrente</h2>
      <p style={{ marginBottom: '1.5rem', color: '#666' }}>
        Usa la función <code>fn_cliente_mas_recurrente()</code> de PostgreSQL
      </p>

      <form onSubmit={handleSearch} className="form">
        <div className="form-group">
          <label>Seleccionar Hotel:</label>
          <select 
            value={selectedHotelId}
            onChange={(e) => setSelectedHotelId(e.target.value)}
            required
          >
            <option value="">-- Selecciona un hotel --</option>
            {hotels.map(hotel => (
              <option key={hotel.id_hotel} value={hotel.id_hotel}>
                {hotel.nombre}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          🔍 Buscar Cliente Recurrente
        </button>
      </form>

      {loading && <div className="loading">Buscando...</div>}
      
      {error && <div className="error">{error}</div>}

      {topClient && (
        <div style={{ marginTop: '2rem' }}>
          <div className="grid-item" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h3>🏆 Cliente #1</h3>
            <p><strong>ID:</strong> {topClient.cliente_id}</p>
            <p><strong>Nombre:</strong> {topClient.nombre_cliente} {topClient.apellido_cliente}</p>
            <p><strong>Total de Reservas:</strong> <span className="badge success">{topClient.total_reservas}</span></p>
          </div>
        </div>
      )}

      {!loading && !error && !topClient && selectedHotelId && (
        <p style={{ textAlign: 'center', marginTop: '2rem', color: '#999' }}>
          Haz clic en "Buscar" para ver el cliente más recurrente
        </p>
      )}
    </div>
  );
}

export default TopClient;

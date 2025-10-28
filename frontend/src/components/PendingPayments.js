import React, { useState, useEffect } from 'react';
import { getPendingPayments, markPaymentAsPaid, getHotels } from '../api';

function PendingPayments() {
  const [payments, setPayments] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState('');
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadHotels();
    loadPayments();
  }, []);

  const loadHotels = async () => {
    try {
      const response = await getHotels();
      setHotels(response.data.data);
    } catch (err) {
      console.error('Error al cargar hoteles:', err);
    }
  };

  const loadPayments = async (hotelId = null) => {
    try {
      setLoading(true);
      const response = await getPendingPayments(hotelId);
      setPayments(response.data.data);
      setSummary(response.data.summary);
      setError(null);
    } catch (err) {
      setError('Error al cargar pagos pendientes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleHotelChange = (hotelId) => {
    setSelectedHotel(hotelId);
    loadPayments(hotelId || null);
  };

  const handleMarkAsPaid = async (reservaId) => {
    if (!window.confirm('¿Marcar este pago como completado?')) return;

    try {
      await markPaymentAsPaid(reservaId);
      setSuccessMessage('Pago marcado como completado exitosamente');
      setTimeout(() => setSuccessMessage(''), 3000);
      loadPayments(selectedHotel || null);
    } catch (err) {
      alert('Error al marcar pago: ' + (err.response?.data?.error || err.message));
    }
  };

  if (loading) return <div className="loading">Cargando pagos pendientes...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="card">
      <h2>💳 Pagos Pendientes</h2>
      <p style={{ marginBottom: '1.5rem', color: '#666' }}>
        Usa el cursor <code>sp_revisar_pagos_pendientes()</code>
      </p>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {/* FORMULARIO DE FILTRO POR HOTEL */}
      <div style={{ 
        background: '#f8f9fa', 
        padding: '1.5rem', 
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#333' }}>🔍 Filtrar por Hotel</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <select
              value={selectedHotel}
              onChange={(e) => handleHotelChange(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                border: '2px solid #dee2e6',
                borderRadius: '6px',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="">🏨 Todos los hoteles</option>
              {hotels.map(hotel => (
                <option key={hotel.id_hotel} value={hotel.id_hotel}>
                  {hotel.nombre} - {hotel.ciudad}
                </option>
              ))}
            </select>
          </div>
          {selectedHotel && (
            <button 
              onClick={() => handleHotelChange('')}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              🔄 Limpiar Filtro
            </button>
          )}
        </div>
        {selectedHotel && (
          <p style={{ marginTop: '0.75rem', color: '#666', fontSize: '0.9rem' }}>
            ✅ Mostrando pagos pendientes de: <strong>
              {hotels.find(h => h.id_hotel === parseInt(selectedHotel))?.nombre}
            </strong>
          </p>
        )}
      </div>

      <div className="stats">
        <div className="stat-card">
          <h3>{summary.total_pendientes || 0}</h3>
          <p>Pagos Pendientes{selectedHotel ? ' (Hotel Filtrado)' : ' (Todos)'}</p>
        </div>
        <div className="stat-card">
          <h3>${parseFloat(summary.monto_total || 0).toFixed(2)}</h3>
          <p>Total a Cobrar</p>
        </div>
      </div>

      {payments.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '2rem', color: '#999' }}>
          ✅ No hay pagos pendientes
        </p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Reserva #</th>
              <th>Cliente</th>
              <th>Hotel</th>
              <th>Habitación</th>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id_reserva}>
                <td>#{payment.id_reserva}</td>
                <td>
                  {payment.nombre} {payment.apellido_paterno}
                  <br />
                  <small style={{ color: '#999' }}>{payment.email}</small>
                </td>
                <td>{payment.hotel_nombre}</td>
                <td>#{payment.num_habitacion}</td>
                <td>{new Date(payment.fecha_reserva).toLocaleDateString()}</td>
                <td><strong>${parseFloat(payment.costo).toFixed(2)}</strong></td>
                <td>
                  <button 
                    className="btn btn-success"
                    onClick={() => handleMarkAsPaid(payment.id_reserva)}
                    style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                  >
                    ✓ Marcar Pagado
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PendingPayments;

import React, { useState } from 'react';
import { getInvoice } from '../api';

function InvoiceGenerator() {
  const [reservaId, setReservaId] = useState('');
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      const response = await getInvoice(reservaId);
      setInvoice(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al generar factura');
      setInvoice(null);
    } finally {
      setLoading(false);
    }
  };

  const getTotalAmount = () => {
    if (!invoice || !invoice.factura) return 0;
    const totalItem = invoice.factura.find(item => item.item === 'TOTAL');
    return totalItem ? parseFloat(totalItem.monto) : 0;
  };

  return (
    <div className="card">
      <h2>🧾 Generador de Facturas</h2>
      <p style={{ marginBottom: '1.5rem', color: '#666' }}>
        Usa la función <code>generar_factura()</code> con cursor
      </p>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>ID de Reserva:</label>
          <input 
            type="number"
            value={reservaId}
            onChange={(e) => setReservaId(e.target.value)}
            placeholder="Ingresa el ID de la reserva"
            required
            min="1"
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? '⏳ Generando...' : '🧾 Generar Factura'}
        </button>
      </form>

      {error && <div className="error" style={{ marginTop: '1rem' }}>{error}</div>}

      {invoice && (
        <div style={{ marginTop: '2rem' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '2rem',
            borderRadius: '12px 12px 0 0'
          }}>
            <h3 style={{ marginBottom: '0.5rem' }}>FACTURA</h3>
            <p>Reserva #{invoice.reserva.id_reserva}</p>
          </div>

          <div style={{ padding: '2rem', background: 'white', border: '1px solid #e0e0e0' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '1rem' }}>Información del Cliente</h4>
              <p><strong>Nombre:</strong> {invoice.reserva.cliente_nombre} {invoice.reserva.cliente_apellido}</p>
              <p><strong>Email:</strong> {invoice.reserva.cliente_email}</p>
              <p><strong>Teléfono:</strong> {invoice.reserva.cliente_telefono}</p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '1rem' }}>Información de la Reserva</h4>
              <p><strong>Hotel:</strong> {invoice.reserva.hotel_nombre}</p>
              <p><strong>Dirección:</strong> {invoice.reserva.hotel_direccion}</p>
              <p><strong>Habitación:</strong> #{invoice.reserva.num_habitacion} - {invoice.reserva.habitacion_tipo}</p>
              <p><strong>Fechas:</strong> {new Date(invoice.reserva.fecha_ini).toLocaleDateString()} - {new Date(invoice.reserva.fecha_fin).toLocaleDateString()}</p>
              <p><strong>Huéspedes:</strong> {invoice.reserva.num_huespedes}</p>
            </div>

            <h4 style={{ marginBottom: '1rem' }}>Detalle de Cargos</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Concepto</th>
                  <th>Descripción</th>
                  <th style={{ textAlign: 'right' }}>Monto</th>
                </tr>
              </thead>
              <tbody>
                {invoice.factura.map((item, index) => (
                  <tr key={index} style={{ 
                    fontWeight: item.item === 'TOTAL' ? 'bold' : 'normal',
                    background: item.item === 'TOTAL' ? '#f8f9fa' : 'transparent'
                  }}>
                    <td>{item.item}</td>
                    <td>{item.descripcion}</td>
                    <td style={{ textAlign: 'right' }}>
                      ${parseFloat(item.monto).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ 
            background: '#f8f9fa', 
            padding: '1.5rem', 
            borderRadius: '0 0 12px 12px',
            border: '1px solid #e0e0e0',
            borderTop: 'none'
          }}>
            <div style={{ textAlign: 'right', fontSize: '1.5rem' }}>
              <strong>Total a Pagar:</strong>{' '}
              <span style={{ color: '#667eea' }}>
                ${getTotalAmount().toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvoiceGenerator;

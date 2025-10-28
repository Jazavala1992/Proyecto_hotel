import React, { useState } from 'react';
import './App.css';
import HotelList from './components/HotelList';
import HotelRooms from './components/HotelRooms';
import TopClient from './components/TopClient';
import PendingPayments from './components/PendingPayments';
import InvoiceGenerator from './components/InvoiceGenerator';
import ReservationForm from './components/ReservationForm';

function App() {
  const [activeView, setActiveView] = useState('hotels');
  const [selectedHotel, setSelectedHotel] = useState(null);

  const renderView = () => {
    switch(activeView) {
      case 'hotels':
        return <HotelList onSelectHotel={(hotel) => {
          setSelectedHotel(hotel);
          setActiveView('rooms');
        }} />;
      case 'rooms':
        return selectedHotel ? (
          <HotelRooms hotel={selectedHotel} />
        ) : (
          <div className="card">
            <p>Selecciona un hotel primero</p>
          </div>
        );
      case 'top-client':
        return <TopClient />;
      case 'payments':
        return <PendingPayments />;
      case 'invoice':
        return <InvoiceGenerator />;
      case 'reservation':
        return <ReservationForm />;
      default:
        return <HotelList onSelectHotel={(hotel) => {
          setSelectedHotel(hotel);
          setActiveView('rooms');
        }} />;
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🏨 Sistema de Gestión Hotelera</h1>
      </header>

      <nav className="nav">
        <button 
          className={activeView === 'hotels' ? 'active' : ''}
          onClick={() => setActiveView('hotels')}
        >
          🏨 Hoteles
        </button>
        <button 
          className={activeView === 'rooms' ? 'active' : ''}
          onClick={() => setActiveView('rooms')}
        >
          🛏️ Habitaciones
        </button>
        <button 
          className={activeView === 'top-client' ? 'active' : ''}
          onClick={() => setActiveView('top-client')}
        >
          ⭐ Cliente Recurrente
        </button>
        <button 
          className={activeView === 'reservation' ? 'active' : ''}
          onClick={() => setActiveView('reservation')}
        >
          📝 Nueva Reserva
        </button>
        <button 
          className={activeView === 'payments' ? 'active' : ''}
          onClick={() => setActiveView('payments')}
        >
          💳 Pagos Pendientes
        </button>
        <button 
          className={activeView === 'invoice' ? 'active' : ''}
          onClick={() => setActiveView('invoice')}
        >
          🧾 Generar Factura
        </button>
      </nav>

      <div className="container">
        {renderView()}
      </div>
    </div>
  );
}

export default App;

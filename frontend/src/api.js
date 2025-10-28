import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Hoteles
export const getHotels = () => api.get('/hotels');
export const getHotel = (id) => api.get(`/hotels/${id}`);
export const getHotelRooms = (id) => api.get(`/hotels/${id}/rooms`);

// Clientes
export const getTopClient = (hotelId) => api.get(`/clients/top/${hotelId}`);
export const getClients = () => api.get('/clients');

// Reservas
export const createReservation = (data) => api.post('/reservations', data);
export const getReservations = (params) => api.get('/reservations', { params });
export const getReservation = (id) => api.get(`/reservations/${id}`);

// Pagos
export const getPendingPayments = (hotelId = null) => {
  const params = hotelId ? { hotelId } : {};
  return api.get('/payments/pending', { params });
};
export const markPaymentAsPaid = (reservaId) => api.patch(`/payments/${reservaId}/mark-paid`);

// Facturas
export const getInvoice = (reservaId) => api.get(`/invoices/${reservaId}`);

export default api;

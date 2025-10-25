const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');
const movieRoutes = require('./routes/movieRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

app.use('/api/movies', movieRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Movie App API',
    version: '1.0.0',
    endpoints: {
      // Movie endpoints
      'GET /api/movies': 'Get all movies',
      'POST /api/movies': 'Create a new movie',
      'GET /api/movies/:id': 'Get movie by ID',
      'PUT /api/movies/:id': 'Update movie by ID',
      'DELETE /api/movies/:id': 'Delete movie by ID',
      
      // Booking endpoints
      'GET /api/bookings': 'Get all bookings (query: userEmail, status)',
      'POST /api/bookings': 'Create a new booking',
      'GET /api/bookings/:id': 'Get booking by ID or bookingId',
      'PATCH /api/bookings/:id/status': 'Update booking status',
      'DELETE /api/bookings/:id': 'Cancel booking',
      'GET /api/bookings/stats/summary': 'Get booking statistics'
    }
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
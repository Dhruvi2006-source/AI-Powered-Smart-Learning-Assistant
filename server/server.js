import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing (CORS) for frontend requests
app.use(cors({
  origin: '*', // Allow local development origins
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Express body parser middleware
app.use(express.json({ limit: '2mb' }));

// Mount API routes under /api
app.use('/api', apiRoutes);

// Root health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'GenAI-Powered Smart Learning Assistant API',
    endpoints: {
      health: '/api/health',
      summarize: 'POST /api/summarize',
      ask: 'POST /api/ask',
      quiz: 'POST /api/quiz'
    }
  });
});

// 404 Fallback for unhandled routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found.`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'An internal server error occurred.'
  });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 SmartLearn Express Backend Server Running!`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`==================================================`);
});

/**
 * Centralized API Configuration
 * Supports environment overrides for future deployment (e.g., Vercel, Render, Railway, Netlify)
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

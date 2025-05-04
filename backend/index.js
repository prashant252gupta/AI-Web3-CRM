import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import dealRoutes from './routes/dealRoutes.js';
import { requireAuth } from './middleware/authMiddleware.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('MongoDB Connected'));

// Auth (no guard)
app.use('/api/auth', authRoutes);

// CRM: everything under /api/contacts and /api/deals now requires a valid JWT
app.use('/api/contacts', requireAuth, contactRoutes);
app.use('/api/deals', requireAuth, dealRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

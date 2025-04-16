import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import contactRoutes from './routes/contactRoutes.js';
import dealRoutes from './routes/dealRoutes.js';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('MongoDB Connected'));

// Routes
app.use('/api/contacts', contactRoutes);
app.use('/api/deals', dealRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

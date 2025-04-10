// index.js
import express from 'express';
import connectDB from './db.js';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('🔥 AI Web3 CRM backend is running!');
});

app.use('/api/contacts', contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

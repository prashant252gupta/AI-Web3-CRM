import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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

// Contact Routes
import contactRoutes from './routes/contactRoutes.js';
app.use('/api/contacts', contactRoutes);

// Deal Schema & Routes
const dealSchema = new mongoose.Schema({
  title: String,
  status: String,
  value: String,
  stage: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Deal = mongoose.model('Deal', dealSchema);

// GET all deals
app.get('/api/deals', async (req, res) => {
  try {
    const deals = await Deal.find();
    res.json(deals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new deal
app.post('/api/deals', async (req, res) => {
  try {
    const newDeal = new Deal(req.body);
    await newDeal.save();
    res.json(newDeal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

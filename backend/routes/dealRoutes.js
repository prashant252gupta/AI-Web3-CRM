// routes/dealRoutes.js
import express from 'express';
import Deal from '../models/Deal.js';

const router = express.Router();

// GET all deals
router.get('/', async (req, res) => {
    const deals = await Deal.find();
    res.json(deals);
});

// POST new deal
router.post('/', async (req, res) => {
    const newDeal = new Deal(req.body);
    await newDeal.save();
    res.status(201).json(newDeal);
});

// GET single deal
router.get('/:id', async (req, res) => {
    const deal = await Deal.findById(req.params.id);
    if (deal) res.json(deal);
    else res.status(404).json({ message: 'Deal not found' });
});

export default router;

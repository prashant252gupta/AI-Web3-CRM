import express from 'express';
import Deal from '../models/Deal.js';

const router = express.Router();

// GET all deals
router.get('/', async (req, res) => {
    try {
        const deals = await Deal.find();
        res.json(deals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new deal
router.post('/', async (req, res) => {
    try {
        const newDeal = new Deal(req.body);
        await newDeal.save();
        res.json(newDeal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE a deal
router.put('/:_id', async (req, res) => {
    try {
        const updatedDeal = await Deal.findByIdAndUpdate(req.params._id, req.body, {
            new: true,
        });
        res.json(updatedDeal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a deal
router.delete('/:_id', async (req, res) => {
    try {
        await Deal.findByIdAndDelete(req.params._id);
        res.json({ message: 'Deal deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;

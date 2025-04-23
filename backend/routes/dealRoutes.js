import express from 'express';
import Deal from '../models/Deal.js';

const router = express.Router();

// GET all deals, populated with contact’s name/email
router.get('/', async (req, res) => {
    try {
        const deals = await Deal.find()
            .populate('contactId', 'name email');
        res.json(deals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new deal (now accepts contactId in body)
router.post('/', async (req, res) => {
    try {
        const newDeal = new Deal(req.body);
        await newDeal.save();
        // populate before sending back
        await newDeal.populate('contactId', 'name email');
        res.status(201).json(newDeal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE a deal (can change contactId too)
router.put('/:_id', async (req, res) => {
    try {
        const updated = await Deal.findByIdAndUpdate(
            req.params._id,
            req.body,
            { new: true }
        ).populate('contactId', 'name email');
        res.json(updated);
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

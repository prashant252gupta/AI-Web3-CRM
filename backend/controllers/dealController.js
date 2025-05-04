// backend/controllers/dealController.js
import Deal from '../models/Deal.js';

export async function getAllDeals(req, res) {
    try {
        const deals = await Deal.find().populate('contactId', 'name');
        res.json(deals);
    } catch (err) {
        console.error('💥 getAllDeals error:', err);
        res.status(500).json({ message: err.message });
    }
}

export async function createDeal(req, res) {
    try {
        const deal = new Deal(req.body);
        const saved = await deal.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error('💥 createDeal error:', err);
        res.status(400).json({ message: err.message });
    }
}

export async function updateDeal(req, res) {
    try {
        const updated = await Deal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Not found' });
        res.json(updated);
    } catch (err) {
        console.error('💥 updateDeal error:', err);
        res.status(400).json({ message: err.message });
    }
}

export async function deleteDeal(req, res) {
    try {
        const deleted = await Deal.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        console.error('💥 deleteDeal error:', err);
        res.status(500).json({ message: err.message });
    }
}

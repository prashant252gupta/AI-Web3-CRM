// backend/controllers/contactController.js
import Contact from '../models/Contact.js';

// GET /api/contacts
export async function getAllContacts(req, res) {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        console.error('💥 getAllContacts error:', err);
        res.status(500).json({ message: err.message });
    }
}

// POST /api/contacts
export async function createContact(req, res) {
    try {
        const contact = new Contact(req.body);
        const saved = await contact.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error('💥 createContact error:', err);
        res.status(400).json({ message: err.message });
    }
}

// GET /api/contacts/:id
export async function getContactById(req, res) {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Not found' });
        res.json(contact);
    } catch (err) {
        console.error('💥 getContactById error:', err);
        res.status(500).json({ message: err.message });
    }
}

// PUT /api/contacts/:id
export async function updateContact(req, res) {
    try {
        const updated = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Not found' });
        res.json(updated);
    } catch (err) {
        console.error('💥 updateContact error:', err);
        res.status(400).json({ message: err.message });
    }
}

// DELETE /api/contacts/:id
export async function deleteContact(req, res) {
    try {
        const deleted = await Contact.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        console.error('💥 deleteContact error:', err);
        res.status(500).json({ message: err.message });
    }
}

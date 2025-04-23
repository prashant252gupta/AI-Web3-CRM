// routes/contactRoutes.js
import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// GET all contacts
router.get('/', async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
});

// POST new contact
router.post('/', async (req, res) => {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json(newContact);
});

// GET single contact
router.get('/:id', async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (contact) res.json(contact);
    else res.status(404).json({ message: 'Not found' });
});

// **PUT** update a contact
router.put('/:id', async (req, res) => {
    try {
        const updated = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// **DELETE** a contact
router.delete('/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: 'Contact deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;

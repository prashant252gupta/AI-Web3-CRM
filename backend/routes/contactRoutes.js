// routes/contactRoutes.js
import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// @route GET /api/contacts
router.get('/', async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
});

// @route POST /api/contacts
router.post('/', async (req, res) => {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json(newContact);
});

// @route GET /api/contacts/:id
router.get('/:id', async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (contact) res.json(contact);
    else res.status(404).json({ message: 'Contact not found' });
});

export default router;

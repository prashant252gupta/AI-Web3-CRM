// backend/routes/contactRoutes.js
import express from 'express';
import {
    getAllContacts,
    createContact,
    getContactById,
    updateContact,
    deleteContact
} from '../controllers/contactController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all contact endpoints
router.use(requireAuth);

// Delegate to controller functions (which import Contact correctly)
router.get('/', getAllContacts);
router.post('/', createContact);
router.get('/:id', getContactById);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;

// backend/routes/dealRoutes.js
import express from 'express';
import {
    getAllDeals,
    createDeal,
    updateDeal,
    deleteDeal
} from '../controllers/dealController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Anyone logged in can GET deals
router.get('/', requireAuth, getAllDeals);

// Only biz-dev or ceo can create/update
router.post('/', requireAuth, requireRole('biz-dev', 'ceo'), createDeal);
router.put('/:id', requireAuth, requireRole('biz-dev', 'ceo'), updateDeal);

// Only ceo can delete
router.delete('/:id', requireAuth, requireRole('ceo'), deleteDeal);

export default router;

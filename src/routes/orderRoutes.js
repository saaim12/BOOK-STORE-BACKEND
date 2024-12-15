import express from 'express';
import { addOrder, getOrders } from '../controllers/orderController.js';

const router = express.Router();

router.post('/add', addOrder);
router.get('/', getOrders);

export default router;

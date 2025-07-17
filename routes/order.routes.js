import express from 'express';
import { checkout, placeOrder } from '../controllers/order.controller.js';
import authenticateToken from '../middleware/authenticate.js'
const router = express.Router();

router.post('/', authenticateToken, placeOrder);
router.post('/checkout', authenticateToken, checkout);

export default router;

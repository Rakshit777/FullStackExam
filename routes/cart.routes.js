import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cart.controller.js';
import authenticateToken from '../middleware/authenticate.js';
const router = express.Router();

router.get('/', authenticateToken, getCart);
router.post('/add', authenticateToken, addToCart);
router.post('/remove', authenticateToken, removeFromCart);

export default router;

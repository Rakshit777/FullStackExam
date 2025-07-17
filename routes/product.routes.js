import express from 'express';
import {
    getCategorySummary,
    getProducts
} from '../controllers/product.controller.js';
import authenticateToken from '../middleware/authenticate.js';

const router = express.Router();

router.get('/',authenticateToken, getProducts);
router.get('/summary/categories',authenticateToken, getCategorySummary);

export default router;
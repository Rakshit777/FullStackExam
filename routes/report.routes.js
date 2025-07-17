import express from 'express';
import { getTopSpenders } from '../controllers/report.controller.js';
import authenticateToken from '../middleware/authenticate.js';

const router = express.Router();


router.get('/top-spenders',authenticateToken, getTopSpenders);

export default router;
import express from 'express';
import { submitDailyBlog } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/submit', protect, submitDailyBlog);

export default router;

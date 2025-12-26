import express from 'express';
import { getPublishedImages, getUserDetails, loginUser, registerUser } from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser);
router.get('/data', protect, getUserDetails);
router.get('/published-images', protect, getPublishedImages);

export default router;



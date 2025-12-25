import express from 'express';
import { getUserDetails, loginUser, registerUser } from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser);
router.get('/data', protect, getUserDetails);

export default router;



import express from 'express';
import { login, logout, signup, admin } from '../controllers/authController.js';


const router = express.Router();

router.post('/login',login);
router.post('/signup',signup);
router.post('/logout',logout);
router.post('/admin',admin);

export default router;
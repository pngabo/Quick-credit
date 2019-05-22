import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router.get('/api/v1/users', UserController.getAllUsers);
router.get('/api/v1/users/:id', UserController.getOneUser);
router.post('/api/v1/auth/signup', UserController.registerUser);
router.post('/api/v1/auth/signin', UserController.signin);
router.patch('/api/v1/users/:email/verify', UserController.VerifyUser);

export default router;
import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router.get('/api/v1/users', UserController.getUsers);
router.get('/api/v1/users/:id', UserController.getUser);
router.post('/api/v1/auth/signup', UserController.userSignup);
router.post('/api/v1/auth/signin', UserController.signin);
router.patch('/api/v1/users/:email/verify', UserController.verify);

export default router;
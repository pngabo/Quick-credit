import express from 'express';
import UserController from '../controllers/userController';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/api/v1/users', auth.isAuth,auth.adminAccess, UserController.getAllUsers);
router.get('/api/v1/users/:id', auth.isAuth,auth.adminAccess, UserController.getOneUser);
router.post('/api/v1/auth/signup', UserController.registerUser);
router.post('/api/v1/auth/signin', UserController.signin);
router.patch('/api/v1/users/:email/verify', auth.isAuth,auth.adminAccess, UserController.VerifyUser);

export default router;
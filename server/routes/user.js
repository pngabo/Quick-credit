import express from 'express';
import userController from '../controllers/user/userController';
import login from '../controllers/user/signIn';
import signup from '../controllers/user/signup';


const router = express.Router();

router.get('/api/v1/users', userController.getUsers);
router.get('/api/v1/users/:id', userController.getUser);
router.post('/api/v1/auth/signup', signup.userSignup);
router.post('/api/v1/auth/signin', login.signin);

export default router;
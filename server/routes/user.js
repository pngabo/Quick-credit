import express from 'express';
import userController from '../controllers/user/userController';
// import auth from '../controllers/user/auth';

const router = express.Router();

router.get('/api/v1/users', userController.getUsers);
router.get('/api/v1/users/:id', userController.getUser);
// router.push('/api/v1/users',userController);
router.post('/api/v1/users', userController.createUser);

// router.post('/api/v1/auth', auth.loginUser);

export default router;
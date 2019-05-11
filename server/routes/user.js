import express from 'express';
import users from '../controllers/user/allUsers';
import oneUser from '../controllers/user/oneUser';
import login from '../controllers/user/signIn';
import signup from '../controllers/user/signup';


const router = express.Router();

router.get('/api/v1/users', users.getUsers);
router.get('/api/v1/users/:id', oneUser.getUser);
router.post('/api/v1/auth/signup', signup.userSignup);
router.post('/api/v1/auth/signin', login.signin);

export default router;
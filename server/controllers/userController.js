import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import _ from 'underscore';
import Users from '../models/user';
import Validation from '../helpers/validation';

class UserController {
    static async registerUser(req, res) {
        const {
            error
        } = Validation.validateUser(req.body);
        if (error) {
            return res.status(400).json({
                status: 400,
                error: error.details[0].message,
            });
        }
        const user = await Users.emailExist(req.body.email);
        if (user.length !== 0) {
            return res.status(409).json({
                status: 409,
                error: `${user[0].email} has been taken by another user`,
            });
        }
        const createUser = await Users.createUser(req.body);
        const newUser = _.omit(createUser[0], 'password');
        const token = jwt.sign({
            newUser
        }, process.env.PRIVATE_KEY, {
            expiresIn: 720
        });
        return res.status(201).json({
            status: 201,
            data: [{
                token,
                user: newUser,
            }]
        });
    }

    static async signin(req, res) {
        const {
            error
        } = Validation.validLogin(req.body);
        if (error) {
            return res.status(400).json({
                error: error.details[0].message,
            });
        }
        const user = await Users.emailExist(req.body.email);
        if (user.length === 0) {
            return res.status(404).json({
                status: 404,
                error: 'Wrong username or password',
            });
        }
        const validPassword = await bcrypt.compare(req.body.password, user[0].password);
        if (validPassword) {
            const newUser = _.omit(user[0], 'password');
            const token = jwt.sign({
                newUser
            }, process.env.PRIVATE_KEY, {
                expiresIn: 720
            });
            return res.status(200).json({
                status: 200,
                data: [{
                    token,
                    user: newUser
                }],
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'Wrong username or password',
        });
    }

    static async VerifyUser(req, res) {
        const {
            email
        } = req.params;
        const {
            error
        } = Validation.validUserVerification(req.body);
        if (error) {
            return res.status(400).json({
                status: 400,
                error: error.details[0].message,
            });
        }
        const findUser = await Users.getSpecificUser(req.params.email);
        if (findUser.length === 0) {
            return res.status(404).json({
                status: 404,
                error: 'THIS EMAIL DOES NOT EXIST IN DATABASE',
            });
        }
        const userUpdate = await Users.updateUser(email, req.body.status);
           return res.status(200).json({
            status: 200,
            data: userUpdate,
        });
    }
    static async getAllUsers(req,res){
        const users = await Users.getAllUsers();
        if (users.length === 0) {
            return res.status(404).json({
                status: 404,
                error: 'NO USERS FOUND',
            });
        }
        return res.status(200).json({
            status: 200,
            data: users,
        });
    }
    static async getOneUser(req, res) {
        if (isNaN(req.params.id)) {
            return res.status(400).json({
                status: 400,
                error: 'USER ID MUST BE AN INTEGER',
            });
        }
        const result = await Users.getOneUser(req.params.id);
        if (result.length === 0) {
            return res.status(404).json({
                status: 404,
                error: 'NO USER FOUND WITH THIS ID'
            });
        }
        return res.status(200).json({
            status: 200,
            data: result,
        });
    }
}
export default UserController;
import validateUser from '../helpers/validation';
import userdb from '../models/usersDb';
import moment from 'moment';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController {
    static async userSignup(req, res) {
        try {
            const {
                error
            } = validateUser.signupValidation(req.body);
            if (error) return res.status(400).json(error.details[0].message);
            const {
                firstname,
                lastname,
                gender,
                address,
                email,
                password
            } = req.body;
            const isAdmin = false;
            const id = userdb.length + 1;
            const status = 'unverified';
            const user = {
                id,
                firstname,
                lastname,
                gender,
                address,
                email,
                password,
                status,
                isAdmin,
                createOn: moment(new Date()).format('YYYY-MMM-DD HH:MM:SS'),
            };
            if (userdb.find(users => users.email === email)) {
                return res.status(409).send({
                    status: 409,
                    error: 'Email already being used by another user',
                });
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            const token = jwt.sign({
                user: userdb.push(user)
            }, "secret-key");
            return res.status(201).json({
                status: 201,
                message: "user created successfully",
                data: [{
                    token,
                    user
                }],
            });
        } catch (error) {
            return res.status(500).json({
                status: 201,
                error: "Intenal server error",
            });
        }

    }
    static async signin(req, res) {
        const {
            error
        } = validateUser.loginValidation(req.body);
        if (error) {
            return res.status(0).json({
                status: 400,
                error: error.details[0].message,
            });
        }
        const {
            email,
            password,
        } = req.body;
        const findUser = userdb.find(user => user.email === email);
        if (!findUser) {
            return res.status(400).send({
                status: 400,
                error: 'Invalid username or password',
            });
        }
        const validPassword = await bcrypt.compare(password, findUser.password);
        if (!validPassword) {
            return res.status(400).send({
                status: 400,
                error: 'Invalid username or password',
            });
        }
        const {
            id,
            firstname,
            lastname,
            status,
            isAdmin,
        } = findUser;

        const payload = {
            id,
            firstname,
            lastname,
            email,
            status,
            isAdmin,
        };
        const SECRET_KEY = "secretkey23456";
        const token = jwt.sign(payload, SECRET_KEY, {
            expiresIn: '1h'
        });

        const result = {
            token,
            id,
            firstname,
            lastname,
            email,
        };
        return res.status(200).json({
            token,
            status: 200,
            message: 'Login successfull',
        });
    }

    static verify(req, res) {
        const {
            error
        } = validateUser.verifyUser(req.body);
        if (error) return res.status(400).json(error.details[0].message);
        const {
            email
        } = req.params;
        const data = userdb.find(user => user.email === email);
        if (data) {
            data.status = req.body.status;
            const newData = {
                id: data.id,
                firstname: data.firstname,
                lastname: data.lastname,
                gender: data.gender,
                email: data.email,
                status: data.status,
                isAdmin: data.isAdmin,
            };
            return res.status(200).send({
                status: 200,
                data: [newData],
            });
        }
        return res.status(404).send({
            status: 404,
            error: 'No user with that email exist in the database',
        });
    }
    static getUser(req, res) {
        const id = parseInt(req.params.id, 10);
        userdb.map(user => {
            if (user.id === id) {
                return res.status(200).send({
                    status: "200",
                    message: "user retrieved successfully",
                    user
                });
            }
        });
        return res.status(404).send({
            status: "404",
            message: "user does not exist"
        });
    }
    static getUsers(req, res) {
        if (userdb.length >= 1) {
            return res.status(200).json({
                status: 200,
                message: "users retrieved successfully",
                Users: userdb,
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: "No users found",
            });
        }
    }

}

export default UserController;
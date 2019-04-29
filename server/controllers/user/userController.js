import db from "../../modules/db";
import Joi from "joi";
import bcrypt from 'bcrypt';

class UserController {
  getUsers(req, res) {
    if (db.length >= 1) {
      return res.status(200).json({
        status: 200,
        message: "users retrieved successfully",
        Users: db,
      });
    } else
      return res.status(404).json({
        status: 404,
        message: "No users found",
      });
  }
  getUser(req, res) {
    const id = parseInt(req.params.id, 10);
    db.map(user => {
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

  async createUser(req, res) {
    const schema = {
      firstname: Joi.string().min(3).max(25).required(),
      lastname: Joi.string().min(3).max(20).required(),
      gender: Joi.string().valid("Male", "Female").min(3).max(10).required(),
      address: Joi.string().min(3).max(25).required(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{5,30}$/).required(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json(result.error.details[0].message);
    }
    const user = {
      id: db.length + 1,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      gender: req.body.gender,
      address: req.body.gender,
      email: req.body.email,
      password: req.body.password,
    };
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    db.push(user);
    return res.status(201).json({
      status: 201,
      message: "user created successfully",
      data: user,
    });
  }
}
const userController = new UserController();
export default userController;
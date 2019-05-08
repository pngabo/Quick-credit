import db from '../../modules/usersDb';
import moment from 'moment';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Signup{
   async  userSignup(req, res) {
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
        const {firstname,lastname,gender,address,email,password}=req.body;
        const isAdmin = false;
        const id = db.length+1;
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
          createOn:moment(new Date()).format('YYYY-MMM-DD HH:MM:SS'),      
        };
        if(db.find(users => users.email === email)){
          return res.status(409).send({
            status: 409,
            error: 'Email already being used by another user',
          });
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        const token = jwt.sign({user:db.push(user)},"secret-key");
        return res.status(201).json({
          status: 201,
          message: "user created successfully",
          data: [{token,user}],
        });
      }    
}
const signup = new Signup();
export default signup;
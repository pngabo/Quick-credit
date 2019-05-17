import db from '../../models/usersDb';
import validateUser from '../../helpers/validation';
import moment from 'moment';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Signup{
   async  userSignup(req, res) {
        const {error} = validateUser.signupValidation(req.body);
        if (error) return res.status(400).json(error.details[0].message);
        const {firstname,lastname,gender,address,email,password} = req.body;
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
          data: {
            token,
            user,
          }
        });
      }    
}
const signup = new Signup();
export default signup;
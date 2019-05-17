import db from '../../models/usersDb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Signin {
 static async signin(req, res) {
    const {
      email,
      password,
    } = req.body;
    const findUser = db.find(user => user.email === email);
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
      status:200,
      message: 'Login successfull',
    });
  }
}
export default Signin;


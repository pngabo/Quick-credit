import db from '../../models/usersDb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Signin {
  async signin(req, res) {
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
      id:findUser.id,
      firstname:findUser.firstname,
      lastname:findUser.lastname,
      email:findUser.email,
      status:findUser.status,
      isAdmin: findUser.isAdmin,
    };
    const token = jwt.sign(payload, 'secret-key', {
      expiresIn: '1h'
    });
    return res.status(200).json({
      token,
      status:200,
      message: 'LOGGED IN SUCCESFULLY',
      token,
      id: findUser.id,
      firstname:findUser.firstname,
      lastname: findUser.lastname,
      email: findUser.email,
      status: findUser.status,
      isadmin:findUser.isAdmin,
    });
  }
}
const signin = new Signin();
export default signin;


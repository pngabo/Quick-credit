import userdb from '../../models/usersDb';
import verifyUsers from '../../helpers/validation';

class VerifyUser {
static  verify(req, res) {
    const { error } = verifyUsers.verifyUser(req.body);
    if (error) return res.status(400).json(error.details[0].message);
      const { email } = req.params;
      const data = userdb.find(user => user.email === email);
      if (data) {
        data.status = req.body.status;
        const newData = {
          id: data.id,
          firstname: data.firstname,
          lastname: data.lastname,
          gender: data.gender,
          email:data.email,
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
}
export default VerifyUser;
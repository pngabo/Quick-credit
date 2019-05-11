import userdb from '../../models/usersDb';

class VerifyUser{
    verify(req, res) {
        const { id } = req.params;
        const data = userdb.find(user => user.id === parseInt(id, 10));
        if (data) {
          data.status = req.body.status;
          const newData = {
            userId: data.id,
            status: data.status,
          };
          return res.status(200).send({
            status: 200,
            data: [data],
          });
        }
        return res.status(404).send({
          status: 404,
          error: 'No user with that id exist',
        });
      }
}
const verifyUser = new VerifyUser();
export default verifyUser;
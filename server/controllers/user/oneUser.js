import db from "../../models/usersDb";

class OneUserController {
  getUser(req, res) {
    const id = parseInt(req.params.id, 10);
    db.map(user => {
      if (user.id === id) {
        return res.status(200).send({
          status: "200",
          message: "user retrieved successfully",
          user
        });
      }else{
        return res.status(404).send({
          status: "404",
          message: "user does not exist"
        });
      }
    });
    
  }
}
const oneUser = new OneUserController();
export default oneUser;
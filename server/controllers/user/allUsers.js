import db from "../../models/usersDb";

class UsersController {
  static getUsers(req, res) {
    if (db.length >= 1) {
      return res.status(200).json({
        status: 200,
        message: "users retrieved successfully",
        Users: db,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "No users found",
      });
    }
  }
}
export default UsersController;
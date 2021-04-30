const userModel = require("../models/userModel");

class userService {
  static async registration(data) {
    const user = new userModel({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });

    return await userModel(user).save();
  }

  static async checkEmailExist(email) {
    return await userModel.findOne({ email });
  }
}

module.exports = userService;

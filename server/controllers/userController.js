require("dotenv").config({ path: "../.env" });
const userService = require("../services/userService");
const sendEmail = require("../utils/sendMail");

const bcrypt = require("bcrypt");
exports.registration = async (req, res, next) => {
  debugger;

  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.json({ success: false, msg: "Please fillup required field." });
  } else if (password.length < 8) {
    return res
      .status(400)
      .json({ msg: "Password must be at least 6 characters." });
  } else {
    const userExists = await userService.checkEmailExist(email);

    if (userExists) {
      return res.status(400).send({ auth: false, msg: "Email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = {
      firstName,
      lastName,
      email,
      password: passwordHash,
    };

    try {
      await sendEmail(email, "Verify your email address");
      console.log(result);
      const user = await userService.registration(newUser);
      if (user) {
        res.json({
          msg: "Register Success! Please activate your email to start.",
        });
      } else {
        return res
          .status(500)
          .send({ auth: false, msg: "Something went wrong" });
      }
    } catch (error) {
      console.log(error);
      res.json({
        msg: "Email could not be sent.",
      });
    }
  }
};

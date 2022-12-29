const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .send({ message: "User not found", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .send({ message: "Invalid Email or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });

    res.status(200).send({ success: true, message: "Login Success", token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Login Failed" });
  }
};

const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(404)
        .send({ success: false, message: "User Already Registered" });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newUser = new userModel(req.body);
    await newUser.save();
    return res
      .status(200)
      .send({ success: true, message: "Registeration Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Registration Failed" });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    console.log(user);
    if (!user) {
      return res
        .status(200)
        .send({ success: false, message: "User Not Found" });
    } else {
      res.status(200).send({
        success: true,
        data: user
        // {
          
        //   name: user.name,
        //   email: user.email,
        //   isAdmin: user.isAdmin,
        //   isDoctor: user.isDoctor,
        //   notification: user.notification,
        //   seennotification: user.seenNotification,
        // },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Auth Error" });
  }
};

module.exports = { loginController, registerController, authController };

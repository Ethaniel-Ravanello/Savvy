const Users = require("../Models/Users.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  const { firstName, lastName, country, email, password, gender } = req.body;
  try {
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: res.statusCode,
        error: true,
        message: "User Already Existed",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      firstName,
      lastName,
      country,
      email,
      password: hashedPassword,
      gender,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, "Zonai", {
      expiresIn: "2h",
    });
    return res.status(200).json({
      status: res.statusCode,
      error: false,
      message: "User Succesfully Created",
      userId: newUser._id,
      token,
    });
  } catch {
    return res.status(500).json({
      status: res.statusCode,
      error: true,
      message: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await Users.findOne({ email: email });
    console.log(existUser);
    if (!existUser) {
      return res.status(400).json({
        status: res.statusCode,
        error: true,
        message: "User Not Found",
      });
    }

    const validPassword = await bcrypt.compare(password, existUser.password);

    if (!validPassword) {
      return res.status(400).json({
        status: res.statusCode,
        error: true,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign({ userId: existUser._id }, "Zonai", {
      expiresIn: "2hr",
    });

    res.status(200).json({
      status: res.statusCode,
      error: false,
      message: "Login Succesful",
      userId: existUser._id,
      token: token,
    });
  } catch {
    return res.status(500).json({
      status: res.statusCode,
      error: true,
      message: "Internal Server Error",
    });
  }
};

exports.signUp = signUp;
exports.login = login;

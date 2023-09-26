const Users = require("../Models/Users.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  const { fullname, email, password, gender } = req.body;
  try {
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User Already Existed" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      fullname,
      email,
      password: hashedPassword,
      gender,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, "Zonai", {
      expiresIn: "2h",
    });
    return res.status(200).json({
      userId: newUser._id,
      token,
      message: "User Succesfully Created",
    });
  } catch {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await Users.findOne({ email });

    if (!existUser) {
      return res.status(400).json({ message: "User Not Found" });
    }

    const validPassword = await bcrypt.compare(password, existUser.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ userId: existUser._id }, "Zonai", {
      expiresIn: "2hr",
    });

    res.status(200).json({
      userId: existUser._id,
      fullName: existUser.fullName,
      token: token,
    });
  } catch {
    return res.status(500).json({ message: "Interna Server Error" });
  }
};

exports.signUp = signUp;
exports.login = login;
const Users = require("../Models/Users");
const bcrypt = require("bcrypt");

const getUserById = async (req, res) => {
  try {
    const response = await Users.findById(req.params.id);
    if (!response) {
      return res.status(400).json({
        status: res.statusCode,
        error: true,
        message: "User Not Found",
      });
    }
    return res.status(200).json({
      status: res.statusCode,
      error: false,
      message: "Succesfully Update Data",
      data: response,
    });
  } catch {
    return res.status(500).json({
      status: res.statusCode,
      error: true,
      message: "Internal Server Error",
    });
  }
};

const updateUserById = async (req, res) => {
  const { firstName, lastName, country, email, password, gender } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const response = await Users.findByIdAndUpdate(
      req.params.id,
      {
        firstName: firstName,
        lastName: lastName,
        country: country,
        email: email,
        password: hashedPassword,
        gender: gender,
      },
      {
        new: true,
      }
    );
    if (!response) {
      return res.status(402).json({
        status: res.statusCode,
        error: true,
        message: "User Not Found",
      });
    }
    return res.status(200).json({
      status: res.statusCode,
      error: false,
      message: "Succesfuly Update User",
      data: response,
    });
  } catch {
    return res.status(500).json({
      status: res.statusCode,
      error: true,
      message: "Internal Server Error",
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const response = await Users.findByIdAndDelete(req.params.id);

    if (!response) {
      return res.status(402).json({
        status: res.statusCode,
        error: true,
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      status: res.statusCode,
      error: false,
      message: "Succesfuly Get User Data",
      data: response,
    });
  } catch {
    return res.status(500).json({
      status: res.statusCode,
      error: true,
      message: "Internal Server Error",
    });
  }
};

exports.getUserById = getUserById;
exports.updateUserById = updateUserById;
exports.deleteUserById = deleteUserById;

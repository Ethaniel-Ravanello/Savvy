const Users = require("../Models/Users");

const getUserById = async (req, res) => {
  try {
    const response = await Users.findById(req.params.id);
    if (!response) {
      return res.status(400).json({ message: "User Not Found" });
    }
    return res.status(200).json(response);
  } catch {
    return res.status(500).json({ message: "Internal Server Errorss" });
  }
};

const updateUserById = async (req, res) => {
  try {
    const response = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!response) {
      return res.status(400).json({ message: "User Not Found" });
    }
    return res.status(200).json(response);
  } catch {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const response = await Users.findByIdAndDelete(req.params.id);

    if (!response) {
      return res.status(400).json({ message: "User Not Found" });
    }

    return res.status(200).json(response);
  } catch {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUserById = getUserById;
exports.updateUserById = updateUserById;
exports.deleteUserById = deleteUserById;

const Users = require("../Models/Users");

const getUserById = async (req, res) => {
  const { userId } = req.params.id;
  try {
    const response = await Users.findById(userId);
    console.log(response);
    if (!response) {
      return res.status(400).json({ message: "User Not Found" });
    }
    return res.status(200).json(response);
  } catch {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUserById = async (req, res) => {
  const { userId } = req.params.id;
  try {
    const response = await Users.findByIdAndUpdate(userId, req.body, {
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
  const { userId } = req.params.id;
  try {
    const response = await Users.findByIdAndDelete(userId);

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

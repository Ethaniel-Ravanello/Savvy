const Income = require("../Models/Income.js");

const getIncome = async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await Income.find({ userId: userId });

    return res.status(200).json({
      status: res.statusCode,
      error: false,
      message: "Succesfully Get All Income Data",
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

const getIncomeById = async (req, res) => {
  const { userId, id } = req.params;
  try {
    const response = await Income.findOne({ userId: userId, _id: id });

    if (!response) {
      return "No Data";
    }

    return res.status(200).json({
      status: res.statusCode,
      error: false,
      message: "Succesfully Get Income Data",
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

const updateIncomeById = async (req, res) => {
  const { userId, updatedData } = req.body;
  try {
    const response = await Income.findOne({
      _id: req.params.id,
      userId: userId,
    });

    response.set(updatedData);
    const updateIncome = await response.save();

    return res.status(200).json({
      status: res.statusCode,
      error: false,
      message: "Succesfully Update Income Data",
      data: updateIncome,
    });
  } catch {
    return res.status(500).json({
      status: res.statusCode,
      error: true,
      message: "Internal Server Error",
    });
  }
};

const createIncome = async (req, res) => {
  try {
    const newIncome = new Income(req.body);
    const saveIncome = await newIncome.save();

    return res.status(200).json({
      status: res.statusCode,
      error: false,
      message: "Succesfully Create Income",
      data: saveIncome,
    });
  } catch {
    return res.status(500).json({
      status: res.statusCode,
      error: true,
      message: "Internal Server Error",
    });
  }
};

const deleteIncomeById = async (req, res) => {
  try {
    await Income.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      status: res.statusCode,
      error: false,
      message: "Succesfully Delete Income",
    });
  } catch {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTotalIncome = async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await Income.find({ userId: userId });
    console.log(response);
    const totalIncome = response.reduce(
      (total, income) => total + income.incomeAmount,
      0
    );

    return res.status(200).json({
      status: res.statusCode,
      error: false,
      message: "Succesfully Get Total Income",
      data: totalIncome,
    });
  } catch {
    return res.status(500).json({
      status: res.statusCode,
      error: true,
      message: "Internal Server Error",
    });
  }
};

exports.getIncome = getIncome;
exports.getIncomeById = getIncomeById;
exports.createIncome = createIncome;
exports.updateIncomeById = updateIncomeById;
exports.deleteIncomeById = deleteIncomeById;
exports.getTotalIncome = getTotalIncome;

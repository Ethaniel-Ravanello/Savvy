const Income = require("../Models/Income.js");

const getIncome = async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await Income.find({ userId: userId });

    return res.status(200).json(response);
  } catch {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getIncomeById = async (req, res) => {
  const { userId } = req.params;
  const { _id } = req.body;
  try {
    const response = await Income.findOne({
      _id: _id,
      userId: userId,
    });

    if (!response) {
      return "No Data";
    }

    return res.status(200).json({ data: response, status: res.statusCode });
  } catch {
    return res.status(500).json({ message: "Internal Server Error" });
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

    return res.status(200).json(updateIncome);
  } catch {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createIncome = async (req, res) => {
  try {
    const newIncome = new Income(req.body);
    const saveIncome = await newIncome.save();

    return res.status(200).json(saveIncome);
  } catch {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteIncomeById = async (req, res) => {
  const { userId } = req.body;
  try {
    await Income.deleteOne({ _id: req.params.id, userId: userId });
    return res.status(200).json({ message: "Income Succesfully Deleted" });
  } catch {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTotalIncome = async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await Income.find({ userId: userId });

    const totalIncome = response.reduce(
      (total, income) => total + income.income_amount,
      0
    );

    return res.status(200).json({
      message: "Succesfuly getting Total Income",
      status: res.statusCode,
      data: totalIncome,
    });
  } catch {
    return res
      .status(500)
      .json({ message: "Internal Error", status: res.statusCode });
  }
};

exports.getIncome = getIncome;
exports.getIncomeById = getIncomeById;
exports.createIncome = createIncome;
exports.updateIncomeById = updateIncomeById;
exports.deleteIncomeById = deleteIncomeById;
exports.getTotalIncome = getTotalIncome;

const Expenses = require("../Models/Expenses");

const getExpenses = async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await Expenses.find({ userId: userId });

    return res.status(200).json({
      status: res.statusCode,
      error: false,
      message: "Succesfully Get All Expenses Data",
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

const getExpensesById = async (req, res) => {
  const { userId, id } = req.params;
  try {
    const response = await Expenses.findOne({
      userId: userId,
      _id: id,
    });

    return res.status(200).json({
      status: res.statusCode,
      error: false,
      message: "Succesfully Get Expenses Data",
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

const createExpense = async (req, res) => {
  try {
    const newExpense = new Expenses(req.body);
    const saveExpense = await newExpense.save();

    return res.status(200).json({
      status: res.statusCode,
      error: false,
      message: "Succesfully Create Expense",
      data: saveExpense,
    });
  } catch {
    return res.status(500).json({
      status: res.statusCode,
      error: true,
      message: "Internal Server Error",
    });
  }
};

const updateExpense = async (req, res) => {
  const { userId, updateData } = req.body;

  try {
    const findExpense = await Expenses.findOne({
      _id: req.params.id,
      userId: userId,
    });
    findExpense.set(updateData);
    const updateExpense = await findExpense.save();
    return res.status(200).json({
      status: res.statusCode,
      error: false,
      message: "Succesfully Update Data",
      data: updateExpense,
    });
  } catch {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteExpense = async (req, res) => {
  const { userId } = req.body;

  try {
    await Expenses.deleteOne({ _id: req.params.id, userId: userId });
    return res.status(200).json({
      status: res.statusCode,
      error: false,
      message: "Succesfully Delete Expense",
    });
  } catch {
    return res.status(500).json({
      status: res.statusCode,
      error: true,
      message: "Internal Server Error",
    });
  }
};

const getTotalExpense = async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await Expenses.find({ userId: userId });

    const totalExpense = response.reduce(
      (total, expense) => total + expense.expenseAmount,
      0
    );

    return res.status(200).json({
      status: res.statusCode,
      error: false,
      message: "Succesfully Get Total Expense",
      data: totalExpense,
    });
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      error: true,
      message: "Internal Server Error",
    });
  }
};

exports.getExpenses = getExpenses;
exports.getExpensesById = getExpensesById;
exports.updateExpense = updateExpense;
exports.createExpense = createExpense;
exports.deleteExpense = deleteExpense;
exports.getTotalExpense = getTotalExpense;

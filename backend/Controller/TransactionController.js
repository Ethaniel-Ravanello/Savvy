const Income = require("../Models/Income.js");
const Expense = require("../Models/Expenses.js");

const getLatestTransaction = async (req, res) => {
  const { userId } = req.params;

  try {
    const income = await Income.find({ userId: userId });
    const expense = await Expense.find({ userId: userId });

    const transaction = income.concat(expense);

    transaction.sort(
      (a, b) =>
        new Date(b.incomeDate || b.expenseDate) -
        new Date(a.incomeDate || a.expenseDate)
    );

    return res.status(200).json({
      message: "Succesfully Get Transaction Data",
      status: res.statusCode,
      data: transaction,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Error", status: res.statusCode });
  }
};

const deleteTransaction = async (req, res) => {
  const { transactionId, type } = req.params;

  try {
    if (type === "Income") {
      await Income.deleteOne({ _id: transactionId });
      return res.status(200).json({
        status: res.statusCode,
        error: false,
        message: "Succesfully Delete Income",
      });
    } else {
      await Expense.deleteOne({ _id: transactionId });
      return res.status(200).json({
        status: res.statusCode,
        error: false,
        message: "Succesfully Delete Expense",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      error: true,
      message: "Internal Error",
    });
  }
};

const deleteAllTransaction = async (req, res) => {
  const { userId } = req.params;
  const { type } = req.body;

  try {
    if (type === "Income") {
      await Income.deleteMany({ userId: userId });
      return res.status(200).json({
        status: res.statusCode,
        error: false,
        message: "All Incomes Succesfuly Deleted",
      });
    } else {
      await Expense.deleteMany({ userId: userId });
      return res.status(200).json({
        status: res.statusCode,
        error: false,
        message: "All Expenses Succesfuly Deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      error: true,
      message: "Internal Error",
    });
  }
};

exports.getLatestTransaction = getLatestTransaction;
exports.deleteTransaction = deleteTransaction;
exports.deleteAllTransaction = deleteAllTransaction;

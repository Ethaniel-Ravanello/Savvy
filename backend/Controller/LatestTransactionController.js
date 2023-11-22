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

exports.getLatestTransaction = getLatestTransaction;

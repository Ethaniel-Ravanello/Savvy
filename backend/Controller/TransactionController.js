const Transaction = require("../Models/Transaction.js");

const getLatestTransaction = async (req, res) => {
  const { userId } = req.params;

  try {
    const transaction = await Transaction.find({ userId: userId });

    const incomeTransaction = transaction
      .filter((transaction) => transaction.transactionType === "Income")
      .reduce((total, income) => total + income.transactionAmount, 0);

    const expenseTransaction = transaction
      .filter((transaction) => transaction.transactionType === "Expense")
      .reduce((total, expense) => total + expense.transactionAmount, 0);

    const groupedTransactions = transaction.reduce((groups, transaction) => {
      const date = new Date(transaction.transactionDate);
      const dateString = date.toISOString().split("T")[0];
      if (!groups[dateString]) {
        groups[dateString] = [];
      }
      groups[dateString].push(transaction);
      return groups;
    }, {});

    const sortedGroupedTransactions = Object.keys(groupedTransactions)
      .sort((a, b) => new Date(b) - new Date(a))
      .reduce((obj, key) => {
        obj[key] = groupedTransactions[key];
        return obj;
      }, {});

    return res.status(200).json({
      status: res.statusCode,
      error: false,
      message: "Succesfully Get Transaction Data",
      data: sortedGroupedTransactions,
      incomeAmount: incomeTransaction,
      expenseAmount: expenseTransaction,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: res.statusCode, error: true, message: "Internal Error" });
  }
};

exports.getLatestTransaction = getLatestTransaction;

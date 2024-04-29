const Transaction = require("../Models/Transaction");

function getCategoryColor(category) {
  switch (category) {
    case "Traveling":
      return "#2563EB";
    case "Gasoline":
      return "#DC2626";
    case "Education":
      return "#3366CC";
    case "Fixes":
      return "#006400";
    case "Food And Drink":
      return "#FF8601";
    case "Freelancing":
      return "#4CAF50";
    case "Gift":
      return "#60a5fa";
    case "Hangout":
      return "#FFA500";
    case "Hobbies":
      return "#800080";
    case "Home":
      return "#F5F5DC";
    case "Insurance":
      return "#FF4500";
    case "Investments":
      return "#673AB7";
    case "Loan":
      return "#FF9800";
    case "Movies":
      return "#6A0DAD";
    case "Other":
      return "#9E9E9E";
    case "Paycheck":
      return "#4CAF50";
    case "Rent":
      return "#228B22";
    case "Savings":
      return "#20B2AA";
    case "Shopping":
      return "#4CA83D";
    case "Subscription":
      return "#C53030";
    case "Transportation":
      return "#805AD5";
    case "Utilites":
      return "#FFA500";
    case "Verhicle":
      return "#C0C0C0";
  }
}

const getExpenses = async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await Transaction.find({
      userId: userId,
      transactionType: "Expense",
    });

    const groupedExpense = response.reduce((groups, transaction) => {
      const date = new Date(transaction.transactionDate);
      const dateString = date.toISOString().split("T")[0];
      if (!groups[dateString]) {
        groups[dateString] = [];
      }
      groups[dateString].push(transaction);
      return groups;
    }, {});

    const sortedGroupedTransactions = Object.keys(groupedExpense)
      .sort((a, b) => new Date(b) - new Date(a))
      .reduce((obj, key) => {
        obj[key] = groupedExpense[key];
        return obj;
      }, {});

    return res.status(200).json({
      status: res.statusCode,
      error: false,
      message: "Succesfully Get All Expenses Data",
      data: sortedGroupedTransactions,
    });
  } catch {
    return res.status(500).json({
      status: res.statusCode,
      error: true,
      message: "Internal Server Error",
    });
  }
};

const getTopExpense = async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await Transaction.find({
      userId: userId,
      transactionType: "Expense",
    }).sort({ transactionAmount: -1 });

    const totalExpense = response.reduce(
      (total, income) => total + income.transactionAmount,
      0
    );

    const categoryMap = new Map();
    response.forEach((transaction) => {
      const { transactionCategory, transactionAmount } = transaction;
      if (categoryMap.has(transactionCategory)) {
        categoryMap.set(transactionCategory, {
          amount:
            categoryMap.get(transactionCategory).amount + transactionAmount,
        });
      } else {
        categoryMap.set(transactionCategory, { amount: transactionAmount });
      }
    });

    const dataWithSummedCategories = Array.from(categoryMap).map(
      ([category, { amount }]) => ({
        transactionCategory: category,
        transactionAmount: amount,
        percentageOfTotalExpense: Math.round((amount / totalExpense) * 100),
        categoryColor: getCategoryColor(category),
      })
    );

    return res.status(200).json({
      status: res.statusCode,
      error: false,
      message: "Succesfully Get Expense",
      expenseAmount: totalExpense,
      data: dataWithSummedCategories.slice(0, 5),
    });
  } catch (error) {
    console.error("Error fetching income data:", error);
    return res.status(500).json({
      status: 500,
      error: true,
      message: "An error occurred while fetching income data.",
    });
  }
};

const createExpense = async (req, res) => {
  try {
    const newExpense = new Transaction(req.body);
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
    const findExpense = await Transaction.findOne({
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
    return res.status(500).json({
      status: res.statusCode,
      error: true,
      message: "Internal Server Error",
    });
  }
};

const deleteExpense = async (req, res) => {
  try {
    await Transaction.deleteMany({ _id: { $in: req.body.ids } });
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

exports.getExpenses = getExpenses;
exports.getTopExpense = getTopExpense;
exports.updateExpense = updateExpense;
exports.createExpense = createExpense;
exports.deleteExpense = deleteExpense;

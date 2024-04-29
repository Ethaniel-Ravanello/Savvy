const Transaction = require("../Models/Transaction.js");

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

const getIncome = async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await Transaction.find({
      userId: userId,
      transactionType: "Income",
    });

    const groupedIncomes = response.reduce((groups, transaction) => {
      const date = new Date(transaction.transactionDate);
      const dateString = date.toISOString().split("T")[0];
      if (!groups[dateString]) {
        groups[dateString] = [];
      }
      groups[dateString].push(transaction);
      return groups;
    }, {});

    const sortedGroupedTransactions = Object.keys(groupedIncomes)
      .sort((a, b) => new Date(b) - new Date(a))
      .reduce((obj, key) => {
        obj[key] = groupedIncomes[key];
        return obj;
      }, {});

    return res.status(200).json({
      status: res.statusCode,
      error: false,
      message: "Succesfully Get All Income Data",
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

const getTopIncome = async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await Transaction.find({
      userId: userId,
      transactionType: "Income",
    }).sort({ transactionAmount: -1 });

    const totalIncome = response.reduce(
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
        percentageOfTotalIncome: Math.round((amount / totalIncome) * 100),
        categoryColor: getCategoryColor(category),
      })
    );

    return res.status(200).json({
      status: res.statusCode,
      error: false,
      message: "Succesfully Get Income",
      incomeAmount: totalIncome,
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

const updateIncomeById = async (req, res) => {
  const { userId, updatedData } = req.body;
  try {
    const response = await Transaction.findOne({
      _id: req.params.id,
      userId: userId,
      transactionType: "Income",
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
    const newIncome = new Transaction(req.body);
    console.log(newIncome);
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
    await Transaction.deleteMany({ _id: { $in: req.body.ids } });
    return res.status(200).json({
      status: res.statusCode,
      error: false,
      message: "Succesfully Delete Income",
    });
  } catch {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getIncome = getIncome;
exports.createIncome = createIncome;
exports.getTopIncome = getTopIncome;
exports.updateIncomeById = updateIncomeById;
exports.deleteIncomeById = deleteIncomeById;

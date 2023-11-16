const Expenses = require("../Models/Expenses");

const getExpenses = async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await Expenses.find({ userId: userId });

    return res.status(200).json(response);
  } catch {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getExpensesById = async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await Expenses.findOne({
      _id: req.params.id,
      userId: userId,
    });

    return res.status(200).json(response);
  } catch {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createExpense = async (req, res) => {
  try {
    const newExpense = new Expenses(req.body);
    const saveExpense = newExpense.save();

    return res.status(200).json(saveExpense);
  } catch {
    return res.status(500).json({ message: "Internal Server Error" });
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

    return res.status(200).json(updateExpense);
  } catch {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteExpense = async (req, res) => {
  const { userId } = req.body;

  try {
    await Expenses.deleteOne({ _id: req.params.id, userId: userId });
    return res.status(200).json({ message: "Expense Succesfully Deleted" });
  } catch {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTotalExpense = async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await Expenses.find({ userId: userId });

    const totalExpense = response.reduce(
      (total, expense) => total + expense.expenses_amount,
      0
    );

    return (
      res.status(200),
      json({
        message: "Succesfuly Getting Total Expense",
        status: res.statusCode,
        data: totalExpense,
      })
    );
  } catch (error) {
    res.status(500).json({ message: "Internal Error", status: res.statusCode });
  }
};

exports.getExpenses = getExpenses;
exports.getExpensesById = getExpensesById;
exports.updateExpense = updateExpense;
exports.createExpense = createExpense;
exports.deleteExpense = deleteExpense;
exports.getTotalExpense = getTotalExpense;

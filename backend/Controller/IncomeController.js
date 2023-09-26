import Income from "../Models/Income.js";

const getIncome = async (req, res) => {
  const { userId } = req.body;
  try {
    const response = await Income.find({ userId: userId });

    return res.status(200).json(response);
  } catch {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getIncomeById = async (req, res) => {
  const { userId } = req.body;
  try {
    const response = await Income.findOne({
      _id: req.params.id,
      userId: userId,
    });

    return res.status(200).json(response);
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

const deleteIncomeById = async (req, res) => {
  const { userId } = req.body;
  try {
    await Income.deleteOne({ _id: req.params.id, userId: userId });
    return res.status(200).json({ message: "Income Succesfully Deleted" });
  } catch {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

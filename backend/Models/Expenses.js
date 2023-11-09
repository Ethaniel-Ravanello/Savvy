const mongoose = require("mongoose");

const ExpensesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    expenses_name: {
      type: String,
      required: true,
    },
    expenses_description: {
      type: String,
    },
    expense_date: {
      type: Date,
      required: true,
    },
    expenses_amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expenses", ExpensesSchema);

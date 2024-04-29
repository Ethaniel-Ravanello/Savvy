const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["Income", "Expense"],
      required: true,
    },
    transactionCategory: {
      type: String,
      enum: [
        "Traveling",
        "Gasoline",
        "Transportation",
        "Food and Drink",
        "Shopping",
        "Movies",
        "Vehicle",
        "Home",
        "Hangout",
        "Fixes",
        "Hobbies",
        "Education",
        "Utilities",
        "Rent",
        "Insurance",
        "Savings",
        "Paycheck",
        "Investments",
        "Subscriptions",
        "Other",
        "Gift",
        "Loan",
        "Freelancing",
      ],
      required: true,
    },
    transactionDescription: {
      type: String,
    },
    transactionDate: {
      type: Date,
      required: true,
    },
    transactionAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);

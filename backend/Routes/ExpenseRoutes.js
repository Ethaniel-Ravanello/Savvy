const express = require("express");

const ExpenseController = require("../Controller/ExpensesController");

const router = express.Router();

router.get("/expense/:userId", ExpenseController.getExpenses);
router.get("/topExpense/:userId", ExpenseController.getTopExpense);

router.post("/expense", ExpenseController.createExpense);
router.put("/expense:id", ExpenseController.updateExpense);
router.delete("/expense", ExpenseController.deleteExpense);

module.exports = router;

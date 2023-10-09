const express = require("express");

const ExpenseController = require("../Controller/ExpensesController");

const router = express.Router();

router.get("/expense", ExpenseController.getExpenses);
router.get("/expense:id", ExpenseController.getExpensesById);

router.post("/expense", ExpenseController.createExpense);
router.put("/expense:id", ExpenseController.updateExpense);
router.delete("/expense:id", ExpenseController.deleteExpense);

module.exports = router;

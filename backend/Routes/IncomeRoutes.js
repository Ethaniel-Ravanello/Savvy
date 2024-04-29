const express = require("express");

const IncomeController = require("../Controller/IncomeController");

const router = express.Router();

router.get("/income/:userId", IncomeController.getIncome);
router.get("/topIncome/:userId", IncomeController.getTopIncome);

router.post("/income", IncomeController.createIncome);
router.put("/income/:id", IncomeController.updateIncomeById);
router.delete("/income", IncomeController.deleteIncomeById);

module.exports = router;

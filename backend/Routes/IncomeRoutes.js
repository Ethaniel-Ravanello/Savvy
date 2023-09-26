const express = require("express");

const IncomeController = require("../Controller/IncomeController");

const router = express.Router();

router.get("/income", IncomeController.getIncome);
router.get("/income/:id", IncomeController.getIncomeById);
router.post("/income", IncomeController.createIncome);
router.put("/income/:id", IncomeController.updateIncomeById);
router.delete("/income/:id", IncomeController.deleteIncomeById);

module.exports = router;

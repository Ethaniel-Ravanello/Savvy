const express = require("express");

const LatestTransactionController = require("../Controller/LatestTransactionController");

const router = express.Router();

router.get(
  "/latestTransaction/:userId",
  LatestTransactionController.getLatestTransaction
);

module.exports = router;

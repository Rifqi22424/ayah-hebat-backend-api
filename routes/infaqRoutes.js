const express = require("express");
const {
  createInfaq,
  getInfaqHistory,
  getInfaqById,
  getAllInfaq,
  getTotalAmountInfaqUser,
} = require("../controllers/infaqController");

const router = express.Router();

router.get("/history", /* #swagger.tags = ['Infaq Controller'] */ getInfaqHistory);
router.get("/amount", /* #swagger.tags = ['Infaq Controller'] */ getTotalAmountInfaqUser);
router.get("/:id", /* #swagger.tags = ['Infaq Controller'] */ getInfaqById);
router.get("/", /* #swagger.tags = ['Infaq Controller'] */ getAllInfaq);
router.post("/", /* #swagger.tags = ['Infaq Controller'] */ createInfaq);

module.exports = router;

const express = require("express");
const {
  createAllocationType,
  getAllocationTypes,
  // editAllocationType,
  updateAllocationTypeStatus,
} = require("../controllers/allocationTypeController");

const router = express.Router();

router.put("/status/:id", /* #swagger.tags = ['Allocation Type Controller'] */ updateAllocationTypeStatus);
// router.put("/:id", editAllocationType);
router.post("/", /* #swagger.tags = ['Allocation Type Controller'] */ createAllocationType);
router.get("/", /* #swagger.tags = ['Allocation Type Controller'] */ getAllocationTypes);

module.exports = router;

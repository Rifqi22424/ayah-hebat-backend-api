const express = require("express");
const {
  getPeminjamanBuku,
  getPeminjamanBukuById,
  updateStatusBuku,
} = require("../../controllers/admin/peminjamanManagementController");

const router = express.Router();

router.get(
  "/",
  /* #swagger.tags = ['Admin Peminjaman Management Controller'] */ getPeminjamanBuku,
);
router.get(
  "/:id",
  /* #swagger.tags = ['Admin Peminjaman Management Controller'] */ getPeminjamanBukuById,
);
router.put(
  "/:id",
  /* #swagger.tags = ['Admin Peminjaman Management Controller'] */ updateStatusBuku,
);

module.exports = router;

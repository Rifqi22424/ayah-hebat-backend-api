const express = require('express');
const {pinjamBuku, getMyPeminjamanBuku, getPinjamBukuById} = require('./../controllers/peminjamBukuController')

const router = express.Router();

router.get("/me", /* #swagger.tags = ['Peminjaman Buku Controller'] */ getMyPeminjamanBuku);
router.get("/:id", /* #swagger.tags = ['Peminjaman Buku Controller'] */ getPinjamBukuById);
router.post("/", /* #swagger.tags = ['Peminjaman Buku Controller'] */ pinjamBuku);

module.exports = router;

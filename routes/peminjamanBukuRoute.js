const express = require('express');
const {pinjamBuku, updateStatusBuku, getPeminjamanBuku, getMyPeminjamanBuku, getPinjamBukuById} = require('./../controllers/peminjamBukuController')
const {authorizeAdmin} = require("../middlewares/authorizationMiddleware");

const router = express.Router();

router.get("/me", getMyPeminjamanBuku);
router.get("/:id", getPinjamBukuById);
router.post("/", pinjamBuku);

// admin only
router.put("/:id", authorizeAdmin, updateStatusBuku);
router.get("/", authorizeAdmin, getPeminjamanBuku); // untuk semua buku dengan query

module.exports = router;
const express = require('express');
const {pinjamBuku, updateStatusBuku, getPeminjamanBuku, getMyPeminjamanBuku} = require('./../controllers/peminjamBukuController')
const {authorizeAdmin} = require("../middlewares/authorizationMiddleware");

const router = express.Router();

router.post("/", pinjamBuku);
router.get("/me", getMyPeminjamanBuku);

// admin only
router.put("/:id", authorizeAdmin, updateStatusBuku);
router.get("/", authorizeAdmin, getPeminjamanBuku); // untuk semua buku dengan query

module.exports = router;
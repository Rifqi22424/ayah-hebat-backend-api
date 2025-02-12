const express = require('express');
const {pinjamBuku, getMyPeminjamanBuku, getPinjamBukuById} = require('./../controllers/peminjamBukuController')

const router = express.Router();

router.get("/me", getMyPeminjamanBuku);
router.get("/:id", getPinjamBukuById);
router.post("/", pinjamBuku);

module.exports = router;
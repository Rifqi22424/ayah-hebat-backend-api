const express = require('express');
const {pinjamBuku} = require('./../controllers/peminjamBukuController')

const router = express.Router();

router.post("/", pinjamBuku);

module.exports = router;
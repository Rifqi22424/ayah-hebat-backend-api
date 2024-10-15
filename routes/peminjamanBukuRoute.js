const express = require('express');
const {pinjamBuku, updateStatusBuku} = require('./../controllers/peminjamBukuController')

const router = express.Router();

router.post("/", pinjamBuku);
router.put("/:id", updateStatusBuku)

module.exports = router;
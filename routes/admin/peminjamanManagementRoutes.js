const express = require('express');
const {getPeminjamanBuku, updateStatusBuku} = require('../../controllers/admin/peminjamanManagementController');

const router = express.Router();

router.get('/', /* #swagger.tags = ['Admin Peminjaman Management Controller'] */ getPeminjamanBuku);
router.put('/:id', /* #swagger.tags = ['Admin Peminjaman Management Controller'] */ updateStatusBuku);

module.exports = router;

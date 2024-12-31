const express = require('express');
const {getPeminjamanBuku, updateStatusBuku} = require('../../controllers/admin/peminjamanManagementController');

const router = express.Router();

router.get('/', getPeminjamanBuku);
router.put('/:id', updateStatusBuku);

module.exports = router;
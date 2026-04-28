const express = require('express');
const { getAllAddresses, createAddress, updateAddress } = require('../controllers/officeAddressController');
const router = express.Router();

router.get('/', /* #swagger.tags = ['Office Address Controller'] */ getAllAddresses);
router.post('/', /* #swagger.tags = ['Office Address Controller'] */ createAddress);
router.put('/:id', /* #swagger.tags = ['Office Address Controller'] */ updateAddress);

module.exports = router;

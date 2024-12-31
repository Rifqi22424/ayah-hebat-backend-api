const express = require('express');
const { getAllAddresses, createAddress, updateAddress } = require('../controllers/officeAddressController');
const router = express.Router();

router.get('/', getAllAddresses);
router.post('/', createAddress);
router.put('/:id', updateAddress);

module.exports = router;

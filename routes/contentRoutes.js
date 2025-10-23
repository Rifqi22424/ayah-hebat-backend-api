const express = require('express');
const router = express.Router();
const watchController = require('../controllers/contentController');
const { authorizeAdmin } = require('../middlewares/authorizationMiddleware'); 

router.route('/')
    .post(authorizeAdmin, watchController.createWatch)
    .get(watchController.getAllWatches);

router.route('/:id')
    .put(authorizeAdmin, watchController.updateWatch)
    .delete(authorizeAdmin, watchController.deleteWatch)
    .get(watchController.getWatchById);

module.exports = router;
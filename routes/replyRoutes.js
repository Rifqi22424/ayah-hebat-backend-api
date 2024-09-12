const express = require('express');
const { getReplyCommentsById, createReply, editReply, deleteReply, likeReply } = require('../controllers/replyController');
const router = express.Router();

router.get('/:commentId', getReplyCommentsById);
router.post('/:commentId', createReply);
router.put('/:replyId', editReply);
router.delete('/:replyId', deleteReply);

router.post('/:replyId/like', likeReply);

module.exports = router;
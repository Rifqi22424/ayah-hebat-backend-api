const express = require('express');
const { createPost, editPost, deletePost, getAllPosts, searchPosts, likePost, dislikePost } = require('../controllers/postController');
const router = express.Router();

router.post('/', createPost);
router.put('/:postId', editPost);
router.delete('/:postId', deletePost);
router.get('/', getAllPosts);
router.get('/search', searchPosts);

router.post('/:postId/like', likePost);
router.delete('/:postId/like', dislikePost);

module.exports = router;
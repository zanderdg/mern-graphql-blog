const express = require('express');
const { body } = require('express-validator/check')
const { getPosts, createPost, deletePost, editPost, getPost } = require('../controllers/feedContoller');
const isAuth = require('../middleware/isAuth');

const router = express();

const validations = [
    body('title',
    'Title is too short and/or Blank'
    ).trim()
    .isLength({ min: 5 })
    .isString(),
    body('content',
    'Description is too short and/or Blank'
    ).isLength({ min: 5, max: 400 })
    .trim()
]

router.get('/feed/post/:postId',isAuth, getPost);
router.get('/feed/posts',isAuth, getPosts);

router.post('/post', validations,isAuth, createPost);
router.put('/edit-post/:postId', validations,isAuth, editPost);
router.delete('/delete-post/:postId',isAuth, deletePost);


module.exports = router;
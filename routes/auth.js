const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.get('/status', isAuth, authController.getUserStatus);

router.patch(
  '/status',
  isAuth,
  [
    body('status')
      .trim()
      .not()
      .isEmpty()
  ],
  authController.updateUserStatus
);

// POST /auth/user/post
router.post('/user/post', authController.createPost);

// POST /auth/user/quest
router.post('/user/quest', authController.createQuest);

// POST /auth/user/comment
router.post('/user/comment', authController.createComment);

// POST /auth/user/react
router.post('/user/react', authController.reactPost);

// GET /auth/user/posts
router.get('/user/posts', authController.getPosts);

// GET /auth/user/avgRecoveryDays
router.get('/user/avgRecoveryDays', authController.getAvgRecoveryDays);

module.exports = router;

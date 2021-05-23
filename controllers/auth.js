const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectID;

const User = require('../models/user');
const Post = require('../models/post');
const Quest = require('../models/quest');

exports.signup = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const error = new Error('Validation failed.');
  //   error.statusCode = 422;
  //   error.data = errors.array();
  //   throw error;
  // }
  const { email, password } = req.body;
  try {
    const user = new User({
      email,
      password: await bcrypt.hash(password, 12)
    });
    const result = await user.save();
    res.status(201).json({ message: 'User created!', userId: result._id.toString() });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString()
      },
      'somesupersecretsecret',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token, userId: loadedUser._id.toString() });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ status: user.status });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateUserStatus = async (req, res, next) => {
  const newStatus = req.body.status;
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      throw error;
    }
    user.status = newStatus;
    await user.save();
    res.status(200).json({ message: 'User updated.' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { userId, content, imgRef, loc } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      throw error;
    }

    const post = new Post({
      userRef: ObjectId(userId),
      content,
      imgRef,
      loc
    });
    await post.save();
    user.posts.push(post);
    await user.save();
    console.log(post);
    res.status(201).json({
      message: 'Post created successfully!',
      post: post,
      userId
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createQuest = async (req, res, next) => {
  try {
    const { userId, symptom, ageRange, content, imgRef, diagDate, recoveryDate, isInit } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      throw error;
    }
    if (!diagDate) diagDate = Date.now().toString();
    const newQuest = new Quest({
      userRef: ObjectId(userId),
      symptom,
      ageRange,
      content,
      diagDate,
      recoveryDate,
      isInit: isInit || true
    });
    await newQuest.save();
    const newQuestRef = newQuest._id
    if (isInit) {
      user.symptom = symptom;
      user.ageRange = ageRange;
      user.diagDate = diagDate;
      user.recoveryDate = recoveryDate
    }
    user.quests.push(newQuestRef);
    await user.save();
    res.status(201).json({
      message: 'Quest created successfully!',
      quest: newQuest,
      userId: newQuestRef.toString()
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.reactPost = async (req, res, next) => {
  try {
    const { userId, postId, reaction } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      throw error;
    }
    const post = await Post.findById(postId);
    if (!reaction) reaction = 2;
    post.reactions.push({ userId: reaction });
    await post.save();
    res.status(201).json({
      message: 'Reaction added successfully!',
      post,
      userId
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getQuests = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId, { quests: 1 });
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      throw error;
    }
    const quests = await Quest.find({ _id: { $in: user.quests } });
    res.status(201).json({
      message: 'Read quests successfully!',
      quests,
      userId
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createComment = async (req, res, next) => {
  try {
    const { userId, parentPostId, content, imgRef, loc } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      throw error;
    }

    const comment = new Post({
      userRef: ObjectId(userId),
      parentPostRef: ObjectId(parentPostId),
      content,
      imgRef,
      loc
    });
    await comment.save();
    const parentPost = await Post.findById(parentPostId);
    parentPost.comments.push(comment);
    await parentPost.save();
    await user.save();
    res.status(201).json({
      message: 'Comment created successfully!',
      comment,
      userId
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const totalItems = await Post.find().countDocuments();
    const posts = await Post.find();

    res.status(200).json({
      message: 'Fetched posts successfully.',
      posts: posts,
      totalItems: totalItems
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAvgRecoveryDays = async (req, res, next) => {
  try {
    const users = await User.find({}, { recoveryDate: 1, diagDate: 1 }),
      DAYS_PER_SECOND = 60 * 60 * 24;
    let allDays = 0,
      userCount = 0;
    for (let user of users) {
      let { recoveryDate, diagDate } = user;
      if (!recoveryDate) continue;
      userCount++;
      allDays += (parseInt(recoveryDate) - parseInt(diagDate)) / DAYS_PER_SECOND;
    }
    res.status(200).json({
      message: 'Fetched avgRecoveryDays successfully.',
      avgDays: parseInt(allDays / userCount),
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.recoveryPercent = async (req, res, next) => {
  try {
    const users = await User.find({}, { email: 1, recoveryDate: 1 }),
      total = users.length;
    let recovered = 0;
    for (let user of users) {
      if (user.recoveryDate) recovered++;
    }
    res.status(200).json({
      message: 'Fetched recoveryPercent successfully.',
      recoveryPercent: parseInt(recovered * 100 / total),
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

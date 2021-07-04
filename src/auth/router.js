'use strict';
const express = require('express');
let router = express.Router();

const basicAuth = require('./middleware/basicAuth');

const bcrypt = require('bcrypt');
const User = require('./models/user-model');

// Sign In 
router.post('/signin', basicAuth, signInHandler);

async function signInHandler(req, res) {
  res.json(req.user);
}

// Sign Up

router.post('/signup', signUpHandler);

async function signUpHandler(req, res, next) {
  try {
    const pass = await bcrypt.hash(req.body.password, 10);
    req.body.password = pass;
    const exist = await User.findOne({ username: req.body.username });
    if (exist) {
      next('User already exist');
      return;
    }
    const user = new User(req.body);
    user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
}

module.exports = router;


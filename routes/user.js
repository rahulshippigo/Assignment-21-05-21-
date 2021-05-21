const bcrypt = require('bcrypt');
const express = require('express');
const config = require('config');
const jwt = require('jsonwebtoken');

const router = express.Router();

const auth = require('../middlewares/auth');
const { User, validateUser } = require('../models/user');
const validate = require('../middlewares/validate')(validateUser);
const generateAuthToken = require('../models/generatetoken');

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
});

router.post('/', validate, async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .send(`User: ${req.body.email} is already registered`);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = generateAuthToken();
  res
    .header('x-auth-token', token)
    .send(token);
});

module.exports = router;
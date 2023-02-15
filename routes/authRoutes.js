const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { jwtkey } = require('../keys');
const requireToken = require('../middleware/requireToken');
const router = express.Router();
const User = mongoose.model('User');


router.post('/signup', async (req, res) => {

  const { email, password, phonenumber } = req.body;

  try {
    const user = new User({ email, password, phonenumber });
    await user.save()
    const token = jwt.sign({ userId: user._id }, jwtkey)
    res.status(200).send({ token, user })
  } catch (err) {
    return res.status(422).send(err.message)
  }


})



router.post('/signin', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email or password" })
  }
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(422).send({ error: "Must provide the write email or password" })
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, jwtkey)
    res.send({ token })
  } catch (err) {
    return res.status(422).send({ error: "Must provide the write email or password 2" })
  }



})



module.exports = router
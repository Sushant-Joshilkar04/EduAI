const express = require('express');
const router = express.Router();

const { signup, login,logout } = require('../Controller/user');
const verifyEmail = require('../Controller/verifyEmail');
const verifyToken = require('../middleware/auth');

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify-email', verifyEmail);
router.post('/logout', logout);
router.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected data accessed", user: req.user });
});

module.exports = router;

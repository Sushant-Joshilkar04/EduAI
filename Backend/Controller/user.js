const sendVerificationEmail = require("../utils/sendMail");
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { username, password,firstName,lastName } = req.body;

    if (!username || !password|| !firstName || !lastName)
      return res.status(400).json({ message: "Please provide username and password" });

    const existingUser = await User.findOne({ username });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
    });

    await sendVerificationEmail(username, newUser._id); 
    return res.status(200).json({
      message: "Signup successful. Please verify your email before logging in."
    });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error creating user" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
   
    if (!username || !password)
      return res.status(400).json({ message: "Please input username and password" });

    const user = await User.findOne({ username }).select('+password');

    if (!user)
      return res.json({ message: "Invalid username or password" });

    if (!user.isVerified)
      return res.status(401).json({ message: "Please verify your email first" });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: "Login successful",
      user,
      token
    });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error logging in user" });
  }
};

exports.logout = (req, res) => {
  try {
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error logging out user" });
  }
}   
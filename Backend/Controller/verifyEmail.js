const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyEmail = async (req, res) => {
  const token = req.query.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).send("User not found");
    if (user.isVerified) return res.send("Email already verified");

    user.isVerified = true;
    await user.save();

    res.send("Email successfully verified. You can now login.");
  } catch (err) {
    console.error("Verification error:", err.message);
    res.status(400).send("Invalid or expired token");
  }
};

module.exports = verifyEmail;

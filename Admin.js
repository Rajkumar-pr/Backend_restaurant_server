const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const password="Ajinkya321";
const secret_key = "Ajinkya123";



const feedUpdate = async (req, res, next) => {
  try {

    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1]; // Format: Bearer <token>
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, secret_key);
      req.user = decoded;
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Check if user exists in DB
    const user = await User.findOne({ username: decoded.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Role check
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
const is_match=await bcrypt.compare(password,req.user.password);
if(!is_match)
{
    return res.status(401).json({message:"Invalid password"});
}
    next();
  } catch (err) {
    console.error("Middleware error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = feedUpdate;

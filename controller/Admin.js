const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const password="Ajinkya321";
const secret_key = "my-super-secret-key-1234567890!@#$%^&*()";



const feedUpdate = async (req, res, next) => {
  try {

    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1]; 
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

  
    let decoded;
    try {
      decoded = jwt.verify(token, secret_key);
      req.user = decoded.user;
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Check if user exists in DB
    const user = await User.findOne({ username: decoded.user.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


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

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const feedUpdate=require("./controller/Admin");
dotenv.config(); // load env variables

const app = express();
const PORT = process.env.PORT || 8080;

// Routes
const router = require("./routes/SignRoute");
const router1 = require("./routes/OrderRoute");
const router2 = require("./routes/Feedback");
const router4=require("./routes/Admin");
// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes usage
app.use("/", router);
app.use("/", router2);
app.use("/order", router1);
app.use("/Feed",router4);

// Test route
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`App is listening on PORT: ${PORT}`);
});


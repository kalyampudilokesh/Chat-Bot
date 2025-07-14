require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const test=require("./routes/test")
const chatRoutes = require("./routes/chat.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("✅ API is running!");
});

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use("/api/chat", chatRoutes);
app.use("/test",test)
app.use("/api/admin", adminRoutes);

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

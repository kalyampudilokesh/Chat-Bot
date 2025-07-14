const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", (req, res) => {
  console.log(req.body);
  res.json({ reply: "Hello from backend!" });
});
module.exports = router;


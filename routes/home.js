const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "My first pug", message: "Welcome to my site" });
});

module.exports = router;

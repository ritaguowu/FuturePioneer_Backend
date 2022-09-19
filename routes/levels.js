const express = require("express");
const router = express.Router();
const levelsComment = require("../comments/levels");

router.get("/", (req, res) => {
  const levels = levelsComment.getLevels();
  res.send(levels);
});

module.exports = router;

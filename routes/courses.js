const express = require("express");
const router = express.Router();
const courseComments = require("../comments/courses");

router.get("/", (req, res) => {
  const courses = courseComments.getCourses();
  res.send(courses);
});

module.exports = router;

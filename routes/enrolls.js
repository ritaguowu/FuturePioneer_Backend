const express = require("express");
const router = express.Router();
const Joi = require("joi");
const multer = require("multer");

const comments = require("../comments/enrolls");
const courses = require("../comments/courses");
const levels = require("../comments/levels");
const users = require("../comments/users");
const validateWith = require("../middleware/validation");
const auth = require("../middleware/auth");
const imageResize = require("../middleware/imageResize");
const delay = require("../middleware/delay");
const enrollMapper = require("../mappers/enrolls");
const config = require("config");

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const schema = {
  courseId: Joi.number().required().min(1),
  levelId: Joi.number().required().min(1),
};

const validateLevelId = (req, res, next) => {
  if (!levels.getLevel(parseInt(req.body.levelId)))
    return res.status(400).send({ error: "Invalid levelId." });

  next();
};

router.get("/", (req, res) => {
  const enrolls = comments.getEnrolls();
  const resources = enrolls.map(enrollMapper);
  res.send(resources);
});

router.delete("/", async (req, res) => {
  const enroll = {
    enrollId: parseInt(req.body.enrollId),
  };
  // console.log(enroll.enrollId);
  comments.deleteEnroll(enroll.enrollId);

  res.status(201).send(enroll);
});

router.post(
  "/",
  [
    // Order of these middleware matters.
    // "upload" should come before other "validate" because we have to handle
    // multi-part form data. Once the upload middleware from multer applied,
    // request.body will be populated and we can validate it. This means
    // if the request is invalid, we'll end up with one or more image files
    // stored in the uploads folder. We'll need to clean up this folder
    // using a separate process.
    // auth,
    upload.array("images", config.get("maxImageCount")),
    // validateWith(schema),
    imageResize,
  ],

  async (req, res) => {
    const { courseId, levelId, kidName } = req.body;
    console.log(courseId, levelId, kidName);
    if (comments.getUserByCourseAndLevel(courseId, levelId, kidName))
      return res
        .status(400)
        .send({ error: "This kid has already enrolled this course." });

    const enroll = {
      courseId: parseInt(req.body.courseId),
      levelId: parseInt(req.body.levelId),
      gradeId: parseInt(req.body.gradeId),
      kidName: req.body.kidName,
      phone: req.body.phone,
      price: req.body.price,
      userId: req.body.userId,
    };

    enroll.images = req.images.map((fileName) => ({ fileName: fileName }));

    comments.addEnroll(enroll);

    res.status(201).send(enroll);
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();
const Joi = require("joi");
const multer = require("multer");

const comments = require("../comments/listings");
const courseNameComments = require("../comments/courses");
const levelComments = require("../comments/courses");
const validateWith = require("../middleware/validation");
const auth = require("../middleware/auth");
const imageResize = require("../middleware/imageResize");
const delay = require("../middleware/delay");
const listingMapper = require("../mappers/listings");
const config = require("config");

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const schema = {
  // title: Joi.string().required(),
  courseId: Joi.number().required().min(1),
  description: Joi.string().required().min(3),
  // price: Joi.number().required().min(1),
  levelId: Joi.number().required().min(1),
  location: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).optional(),
};

const validateLevelId = (req, res, next) => {
  if (!level.getLevel(parseInt(req.body.levelId)))
    return res.status(400).send({ error: "Invalid levelId." });

  next();
};

router.get("/", (req, res) => {
  const listings = comments.getListings();
  const resources = listings.map(listingMapper);
  res.send(resources);
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
    validateWith(schema),
    validateLevelId,
    imageResize,
  ],

  async (req, res) => {
    const listing = {
      courseId: parseInt(req.body.courseId),
      levelId: parseInt(req.body.levelId),
      description: req.body.description,
    };
    listing.images = req.images.map((fileName) => ({ fileName: fileName }));
    if (req.body.location) listing.location = JSON.parse(req.body.location);
    if (req.user) listing.userId = req.user.userId;

    comments.addListing(listing);

    res.status(201).send(listing);
  }
);

module.exports = router;

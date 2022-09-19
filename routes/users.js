const express = require("express");
const router = express.Router();
const Joi = require("joi");
const multer = require("multer");

const usersStore = require("../comments/users");
const validateWith = require("../middleware/validation");
const userMapper = require("../mappers/users");
const { route } = require("./enrolls");
const imageResize = require("../middleware/imageResize");
const config = require("config");

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const schema = {
  name: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
};

router.post("/", validateWith(schema), (req, res) => {
  const { name, email, password, image } = req.body;
  if (usersStore.getUserByEmail(email))
    return res
      .status(400)
      .send({ error: "A user with the given email already exists." });

  const user = { name, email, password, image };
  user.image = {
    url: "",
    thumbnailUrl: "",
  };
  usersStore.addUser(user);

  res.status(201).send(user);
});

router.get("/", (req, res) => {
  const users = usersStore.getUsers();
  const resources = users.map(userMapper);
  res.send(resources);
  // res.send(usersStore.getUsers());
});

router.put(
  "/",
  [upload.array("images", config.get("maxImageCount")), imageResize],

  async (req, res) => {
    // console.log(req.body);
    const user = {
      email: req.body.email,
    };

    user.image = req.images.map((fileName) => ({ fileName: fileName }));
    console.log(req.images);

    usersStore.updateUser(user);

    res.status(201).send(user);
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();

const store = require("../comments/enrolls");
const auth = require("../middleware/auth");
const enrollMapper = require("../mappers/enrolls");

router.get("/:id", auth, (req, res) => {
  const enroll = store.getEnroll(parseInt(req.params.id));
  if (!enroll) return res.status(404).send();
  const resource = enrollMapper(enroll);
  res.send(resource);
});

module.exports = router;

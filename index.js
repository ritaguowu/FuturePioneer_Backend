const express = require("express");
const courses = require("./routes/courses");
const levels = require("./routes/levels");
const listings = require("./routes/comments");
const listing = require("./routes/comment");
const users = require("./routes/users");
const user = require("./routes/user");
const auth = require("./routes/auth");
const enroll = require("./routes/enroll");
const enrolls = require("./routes/enrolls");
const my = require("./routes/my");
const messages = require("./routes/messages");
const expoPushTokens = require("./routes/expoPushTokens");
const helmet = require("helmet");
const compression = require("compression");
const config = require("config");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: "50mb" }));

app.use("/api/courses", courses);
app.use("/api/levels", levels);
app.use("/api/listing", listing);
app.use("/api/listings", listings);
app.use("/api/user", user);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/enroll", enroll);
app.use("/api/enrolls", enrolls);
app.use("/api/my", my);
app.use("/api/expoPushTokens", expoPushTokens);
app.use("/api/messages", messages);

const port = process.env.PORT || config.get("port");
app.listen(port, function () {
  console.log(`Server started on port ${port}...`);
});

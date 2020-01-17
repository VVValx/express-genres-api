const home = require("./routes/home");
const genres = require("./routes/genres");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const joi = require("joi");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const log = require("./middlewares/log");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views"); //default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(helmet());
if (app.get("env") == "development") {
  app.use(morgan("tiny"));
  startupDebugger("morgan enabled...");
}

app.use("/", home);
app.use("/api/genres", genres);

app.use(log);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to port ${port}`));

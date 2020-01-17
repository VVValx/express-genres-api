const express = require("express");
const router = express.Router();

const genres = [
  { id: 1, title: "Action" },
  { id: 2, title: "Adventure" },
  { id: 3, title: "Thriller" },
  { id: 4, title: "Drama" }
];

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Course not found");

  res.send(genre);
});

router.post("/", (req, res) => {
  const obj = { title: req.body.title };

  const { error } = validate(obj);

  const genre = { id: genres.length + 1, title: req.body.title };

  if (error) return res.status(400).send(error.details[0].message);
  genres.push(genre);
  res.send(genre);
});

router.put("/:id", (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));

  if (!genre) return res.status(404).send("Genre not found");

  const obj = { title: req.body.title };
  const { error } = validate(obj);
  if (error) return res.status(400).send(error.details[0].message);

  genre.title = req.body.title;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));

  if (!genre) return res.status(404).send("Genre not found");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genres);
});

const validate = obj => {
  const schema = {
    title: joi
      .string()
      .min(3)
      .max(20)
      .required()
  };

  return joi.validate(obj, schema);
};

module.exports = router;

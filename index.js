const joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const genres = [
  { id: 1, title: "Action" },
  { id: 2, title: "Adventure" },
  { id: 3, title: "Thriller" },
  { id: 4, title: "Drama" }
];

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.post("/api/genres", (req, res) => {
  const obj = { title: req.body.title };

  const { error } = validate(obj);

  const genre = { id: genres.length + 1, title: req.body.title };

  if (error) return res.status(400).send(error.details[0].message);
  genres.push(genre);
  res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));

  if (!genre) return res.status(404).send("Genre not found");

  const obj = { title: req.body.title };
  const { error } = validate(obj);
  if (error) return res.status(400).send(error.details[0].message);

  genre.title = req.body.title;
  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
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

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to port ${port}`));

import express from "express";
import cors from "cors";
import {
  addGame,
  listGames,
  removeGame,
  validateGame,
} from "./games.js";

export const app = express();

app.use(cors({ origin: /^http:\/\/(localhost|127\.0\.0\.1):\d+$/ }));
app.use(express.json());

app.get("/games", (req, res) => {
  res.json(listGames(req.query.genre));
});

app.post("/games", (req, res) => {
  const error = validateGame(req.body);
  if (error) {
    res.status(400).json({ error });
    return;
  }

  const { title, genre, year } = req.body;
  const game = addGame({
    title: title.trim(),
    genre,
    year: Number(year),
  });
  res.status(201).json(game);
});

app.delete("/games/:id", (req, res) => {
  if (!removeGame(req.params.id)) {
    res.status(404).json({ error: "Juego no encontrado." });
    return;
  }
  res.status(204).end();
});

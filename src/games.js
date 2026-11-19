import { randomUUID } from "node:crypto";

export const GENRES = ["RPG", "Shooter", "Puzzle"];
export const MIN_YEAR = 1958;
export const MAX_YEAR = new Date().getFullYear();

const INITIAL_GAMES = [
  { id: "echo-realm", title: "Echo Realm", genre: "RPG", year: 2024 },
  { id: "neon-drift", title: "Neon Drift", genre: "Shooter", year: 2023 },
  { id: "block-logic", title: "Block Logic", genre: "Puzzle", year: 2025 },
  { id: "ashen-vale", title: "Ashen Vale", genre: "RPG", year: 2022 },
  { id: "orbit-strike", title: "Orbit Strike", genre: "Shooter", year: 2025 },
  { id: "mirror-grove", title: "Mirror Grove", genre: "Puzzle", year: 2021 },
];

let games = structuredClone(INITIAL_GAMES);

export function listGames(genre) {
  return genre ? games.filter((game) => game.genre === genre) : [...games];
}

export function addGame({ title, genre, year }) {
  const game = { id: randomUUID(), title, genre, year };
  games = [game, ...games];
  return game;
}

export function removeGame(id) {
  const before = games.length;
  games = games.filter((game) => game.id !== id);
  return games.length !== before;
}

export function resetGames() {
  games = structuredClone(INITIAL_GAMES);
}

export function validateGame(body = {}) {
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const genre = body.genre;
  const year = Number(body.year);

  if (title.length === 0 || title.length > 60) {
    return "El título es obligatorio y debe tener máximo 60 caracteres.";
  }
  if (!GENRES.includes(genre)) {
    return `El género debe ser uno de: ${GENRES.join(", ")}.`;
  }
  if (!Number.isInteger(year) || year < MIN_YEAR || year > MAX_YEAR) {
    return `El año debe estar entre ${MIN_YEAR} y ${MAX_YEAR}.`;
  }
  return null;
}

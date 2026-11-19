import { beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { app } from "../src/app.js";
import { resetGames } from "../src/games.js";

describe("games-api", () => {
  beforeEach(() => {
    resetGames();
  });

  test("GET /games devuelve el catálogo inicial", async () => {
    const response = await request(app).get("/games");
    assert.equal(response.status, 200);
    assert.equal(response.body.length, 6);
    assert.equal(response.body[0].title, "Echo Realm");
  });

  test("GET /games?genre=RPG filtra por género", async () => {
    const response = await request(app).get("/games?genre=RPG");
    assert.equal(response.status, 200);
    assert.equal(response.body.length, 2);
    assert.ok(response.body.every((game) => game.genre === "RPG"));
  });

  test("POST /games agrega un juego válido", async () => {
    const response = await request(app)
      .post("/games")
      .send({ title: "  Silent Cascade  ", genre: "Puzzle", year: 2026 });

    assert.equal(response.status, 201);
    assert.equal(response.body.title, "Silent Cascade");
    assert.equal(response.body.genre, "Puzzle");
    assert.equal(response.body.year, 2026);
    assert.ok(response.body.id);

    const list = await request(app).get("/games");
    assert.equal(list.body.length, 7);
  });

  test("POST /games rechaza datos inválidos", async () => {
    const cases = [
      { title: "", genre: "RPG", year: 2024 },
      { title: "Sin género", genre: "Arcade", year: 2024 },
      { title: "Año viejo", genre: "RPG", year: 1800 },
      { title: "Año futuro", genre: "RPG", year: 9999 },
    ];

    for (const body of cases) {
      const response = await request(app).post("/games").send(body);
      assert.equal(response.status, 400);
      assert.ok(response.body.error);
    }
  });

  test("DELETE /games/:id elimina un juego existente", async () => {
    const response = await request(app).delete("/games/echo-realm");
    assert.equal(response.status, 204);

    const list = await request(app).get("/games");
    assert.equal(list.body.length, 5);
    assert.ok(!list.body.some((game) => game.id === "echo-realm"));
  });

  test("DELETE /games/:id responde 404 si no existe", async () => {
    const response = await request(app).delete("/games/no-existe");
    assert.equal(response.status, 404);
    assert.equal(response.body.error, "Juego no encontrado.");
  });
});

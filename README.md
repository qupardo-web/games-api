# games-api

API REST del taller DevOps e Integración Continua. Catálogo de videojuegos en memoria.

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/games` | Lista todos los juegos. Acepta `?genre=RPG`. |
| POST | `/games` | Agrega un juego `{ title, genre, year }`. |
| DELETE | `/games/:id` | Elimina un juego. |

Géneros válidos: `RPG`, `Shooter`, `Puzzle`.

## Desarrollo

```bash
npm ci
npm start
```

Escucha en `http://localhost:5000`.

## Tests y cobertura

```bash
npm run test:cov
```

Genera `coverage/lcov.info` para SonarQube.

## Docker

```bash
docker build -t games-api .
docker run --rm -p 8081:5000 games-api
```

# Portuguese Variety Identifier Demo

## Deploy with docker compose

```bash
docker compose up --build
```

## Deploy with Docker

```bash
docker build -t ptvid .
docker run -p 3000:3000 -p 5000:5000 --network=host ptvid
```


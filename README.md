# Portuguese Variety Identifier Demo

## Deploy with docker compose

```bash
docker compose up --build
```


## For Local Development

### Build backend

```bash
conda create -p ./.conda python=3.11
conda activate ./.conda
pip install -r backend/requirements.txt
python backend/app.py
```

### Build frontend

On a different terminal, run:

```bash
cd frontend
npm install
npm run dev
```

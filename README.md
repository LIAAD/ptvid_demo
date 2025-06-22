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

## Citation

If you use this model in your work, please cite the following paper:
```
@article{Sousa2025,
   author = {Hugo Sousa and Rúben Almeida and Purificação Silvano and Inês Cantante and Ricardo Campos and Alipio Jorge},
   doi = {10.1609/aaai.v39i24.34705},
   issn = {2374-3468},
   issue = {24},
   journal = {Proceedings of the AAAI Conference on Artificial Intelligence},
   month = {4},
   pages = {25192-25200},
   title = {Enhancing Portuguese Variety Identification with Cross-Domain Approaches},
   volume = {39},
   year = {2025}
}
```

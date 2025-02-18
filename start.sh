#!/bin/bash

# Start the Flask backend
cd /app/backend
FLASK_APP=app.py FLASK_PORT=$FLASK_PORT python -m flask run --host=0.0.0.0 --port=$FLASK_PORT &

# Start the Next.js frontend
cd /app/frontend
HOST=$HOST PORT=$NEXT_PORT npm run start 
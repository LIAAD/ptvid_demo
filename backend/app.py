import os

import torch
from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from transformers import pipeline

load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")
PORT = os.getenv("PORT")
DEBUG = os.getenv("DEBUG")

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = DEBUG


def compare_text(text):  # always returns probability of being PT-PT
    model_name = "liaad/LVI_bert-large-portuguese-cased"
    pipe = pipeline(model=model_name)
    res = pipe(text)[0]
    probability = res["score"]
    if res["label"] == "PT-BR":
        return 1 - probability
    else:
        return probability


@app.route("/")
def home():
    return render_template("vid.html")


@app.route("/compare", methods=["POST"])
def compare():
    data = request.get_json()
    input_text = data["text"]
    probability = compare_text(input_text)
    return jsonify(probability)

@app.route("/info")
def info():
    return render_template("info.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT, debug=True)
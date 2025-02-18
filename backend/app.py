import torch
from flask import Flask, jsonify, request
from flask_cors import CORS
from transformers import pipeline

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

PIPELINE = pipeline(model="liaad/PtVId", device=DEVICE)


def compare_text(text):  # always returns probability of being PT-PT
    res = PIPELINE(text)[0]
    probability = res["score"]
    if res["label"] == "PT-BR":
        return 1 - probability
    else:
        return probability


@app.route("/compare", methods=["POST"])
def compare():
    data = request.get_json()
    input_text = data["text"]
    probability = compare_text(input_text)
    return jsonify(probability)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", debug=False)

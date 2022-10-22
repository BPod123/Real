from flask import Flask
import socket
app = Flask(name)
from flask import request

# @app.route("/newsHeadline", methods=["POST"])
# def fakeNewsDetection():
#     # headline = request.json['title']
#     return {headline: "You are fake"}

@app.route("/test", methods=["GET"])
def fakeNewsDetection():
    # headline = request.json['title']
    return {'headline': "You are fake"}


@app.route('/header', methods = ['POST'])
def get_query_from_react():
    print("283789273827", request.data)
    data = request.form
    print(data)
    return {"mystuff": 32923}

if name == "main":
    app.run(debug=True, host="0.0.0.0", port=8000)
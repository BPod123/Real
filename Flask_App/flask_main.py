from flask import Flask
import socket
from Flask_App.Controller import Controller
from flask import request
import json

# @app.route("/newsHeadline", methods=["POST"])
# def fakeNewsDetection():
#     # headline = request.json['title']    
#     return {headline: "You are fake"}

from flask_cors import CORS;
app = Flask(__name__, static_url_path='')
CORS(app)

C = Controller()

@app.route("/test", methods=["GET"])
def fakeNewsDetection():
    # headline = request.json['title']
    return {'headline': "You are fake"}


@app.route('/header', methods = ['POST'])
def get_query_from_react():
    phrase = json.loads(request.data)["phrase"]
    print("283789273827", type(phrase), phrase)
    truthiness = C.evaluate_headline(phrase)
    return json.dumps({"Truthiness": 1 - truthiness}, indent = 4) 

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)
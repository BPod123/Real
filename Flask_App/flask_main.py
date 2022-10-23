from flask import Flask
import socket
from Controller import Controller
from flask import request

# @app.route("/newsHeadline", methods=["POST"])
# def fakeNewsDetection():
#     # headline = request.json['title']    
#     return {headline: "You are fake"}

from flask_cors import CORS;
app = Flask(__name__, static_url_path='')
CORS(app)

@app.route("/test", methods=["GET"])
def fakeNewsDetection():
    # headline = request.json['title']
    return {'headline': "You are fake"}


@app.route('/header', methods = ['POST'])
def get_query_from_react():
    print("283789273827", request.data)
    return request.data

if __name__ == "__main__":
    
    app.run(debug=True, host="0.0.0.0", port=8000)
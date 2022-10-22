from flask import Flask
import socket
app = Flask(__name__)

@app.route("/")
def
import socket
import json
from Model.NBOW import NBOW
import os
import torch
from torch.nn.utils.rnn import pad_sequence
import re
import html
import nltk
from threading import Thread


class Controller(object):
    def __init__(self, port):
        self.port = port
        self.socket = socket.socket()
        ipaddress = socket.gethostbyname(socket.gethostname())
        self.socket.bind((ipaddress, self.port))

        # Get the repo root directory path
        workingDir = os.getcwd()
        baseName = os.path.basename(workingDir)
        while baseName != "Real":
            workingDir = os.path.dirname(workingDir)
            baseName = os.path.basename(workingDir)
        # Get vocab and model paths
        vocabPath = os.path.join(workingDir, "Data/vocab.json")
        modelPath = os.path.join(workingDir, "Model/NBOW.pt")
        # Load the vocab
        with open(vocabPath, "r") as vocabFile:
            self.vocab = json.load(vocabFile)
        # Load the model
        self.model = NBOW(len(self.vocab), 300)
        self.model.load_state_dict(torch.load(modelPath, map_location='cpu'))
        self.model.eval()

    def evaluate_headline(self, headline: str):
        # PAD, UNK = 0, 1
        # max length = 50
        tokens = nltk.word_tokenize(Controller.clean_text(headline.lower()))
        tensor = torch.LongTensor(
            [self.vocab[tokens[i]] if i < len(tokens) and tokens[i] in self.vocab else self.vocab["UNK"] for i in
             range(50)])
        model_input = pad_sequence([tensor], padding_value=0, batch_first=True)
        out = self.model(model_input)
        return float(out)

    @staticmethod
    def clean_text(text):
        text = (
            text.replace("#39;", "'")
                .replace("amp;", "&")
                .replace("#146;", "'")
                .replace("nbsp;", " ")
                .replace("#36;", "$")
                .replace("\\n", "\n")
                .replace("quot;", "'")
                .replace("<br />", "\n")
                .replace('\\"', '"')
                .replace(" @.@ ", ".")
                .replace(" @-@ ", "-")
                .replace(" @,@ ", ",")
                .replace("\\", " \\ ")
        )
        text = re.compile(r"  +").sub(" ", html.unescape(text))
        text = re.sub(r"(\n(\s)*){2,}", "\n", text)
        text = re.sub(r"([/#\n])", r" \1 ", text)
        text = re.sub(" {2,}", " ", text).strip()
        return text

    def run(self):
        Thread(target=self.acceptConnections).start()

    def acceptConnections(self):
        self.socket.listen(10)
        while True:
            connectionSocket, addr = socket.accept()
            Thread(target=self.handleConnection, args=(connectionSocket, addr)).start()

    def handleConnection(self, connectionSocket, addr):
        data = connectionSocket.recv(1024).decode()
        breakpoint()
        headline = data['text']
        result = self.evaluate_headline(headline)
        breakpoint()

if __name__ == '__main__':
    c = Controller('123')
    result = c.evaluate_headline("The sky is falling!")
    fake_headlines = [
        "Pentagon Warns Chinese Landmass Could Break Off And Zoom Across The Ocean To Get Us",
        "James Corden Breaks Silence On Restaurant Controversy: ‘I Like To Find Stray Dogs And Suffocate Them To Death’",
        "Things To Never Say To Someone Who Owns A Tesla",
        "Calling All Chicago-Area Worms: I Started A Worm Club To Meet Other Worms",
        "Amazon Unveils New AmazonBasics Human Infant"
    ]
    for headline in fake_headlines:
        result = c.evaluate_headline(headline)
        print(f"{headline}\nOutput: {result}\nPrediction: {'Real' if round(result) == 0 else 'Fake'}\n\n")
"""
Neural Bag of Words ([NBOW](https://www.aclweb.org/anthology/P15-1162.pdf))
"""
import torch.nn as nn
class NBOW(nn.Module):
    def __init__(self, vocab_size, embedding_dim):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embedding_dim)
        self.dropout = nn.Dropout(0.3)
        self.linear = nn.Linear(embedding_dim, 1)
        self.sig = nn.Sigmoid()
    def forward(self, x):
        out = self.embedding(x)
        out = self.dropout(out)
        out = out.mean(1)
        out = self.linear(out)
        out = self.sig(out).squeeze()
        return out
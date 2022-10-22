import torch
from torch.utils.data import Dataset
class HeadlineDataset(Dataset):
    def __init__(self, vocab, df, max_length=50):
        self.vocab = vocab
        self.df = df
        self.max_length = max_length
        self.cache = {}

    def __len__(self):
        return len(self.df)

    def __getitem__(self, index: int):
        row = self.df.iloc[index]
        tokenized = row['tokenized']
        tokenized_word_tensor = torch.LongTensor(
            [self.vocab[tokenized[i]] if i < len(tokenized) and tokenized[i] in self.vocab else self.vocab["UNK"] for i
             in range(self.max_length)])
        curr_label = row['label']

        return tokenized_word_tensor, curr_label

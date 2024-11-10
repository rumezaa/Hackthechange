import tensorflow as tf
import numpy as np
from keras.preprocessing.sequence import pad_sequences
from keras import models
from keras.preprocessing.text import Tokenizer

MAX_LEN = 75

#  From testing dataset: sadness (0), joy (1), love (2), anger (3), fear (4)


def split_long_text(lText, maxLen):
    def divide_list(l, n):
        for i in range(0, len(l), n):
            yield l[i:i + n]

    words = lText.split()
    texts = list(divide_list(words, maxLen))

    text = ""
    split_texts = []
    for row in texts:
        split_texts.append(''.join(row))

    return split_texts


def load_text(text):
    tokenizer = Tokenizer(num_words=10000)
    tokenizer.fit_on_texts([text])

    sequences = tokenizer.texts_to_sequences([text])
    max_len = 75

    padded_sequences = pad_sequences(sequences, maxlen=max_len)

    print("Padded Sequences:")
    print(padded_sequences)

    return padded_sequences


def test(data):
    model = models.load_model('./models/net.h5')
    model.summary()
    return model.predict(data)


print(test(load_text('sample text')))

texts = split_long_text('sample long text', MAX_LEN)

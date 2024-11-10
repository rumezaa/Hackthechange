import tensorflow as tf
import pandas as pd
from keras.preprocessing.text import Tokenizer
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.optimizers import Adam
from keras.preprocessing.sequence import pad_sequences
import numpy as np

# dependency outdated, couldn't convert h5 to json to save weights
import tensorflowjs as tfjs


def load_dataset(file_path):
    df = pd.read_csv(file_path)

    print(df.head())

    samples = df['text'].tolist()
    tokenizer = Tokenizer(num_words=10000)
    tokenizer.fit_on_texts(samples)

    sequences = tokenizer.texts_to_sequences(samples)

    max_len = 75
    print(max_len)
    padded_sequences = pad_sequences(sequences, maxlen=max_len)

    print("Padded Sequences:")
    print(padded_sequences)

    labels = df['label'].values
    labels = np.array(labels)

    return padded_sequences, labels, max_len


xs, ys, max_len = load_dataset('./data/training.csv')

model = Sequential()
model.add(Dense(16, input_dim=75, activation='relu'))
model.add(Dense(8, activation='relu'))
model.add(Dense(8, activation='relu'))
model.add(Dense(1, activation='softmax'))


model.compile(optimizer=Adam(),
              loss='sparse_categorical_crossentropy', metrics=['accuracy'])

model.fit(xs, ys, epochs=100, batch_size=10, shuffle=True, verbose=1)
print("Training complete")

x1s, y1s, _ = load_dataset('./data/test.csv')

t = model.evaluate(x1s, y1s)
model.save(f"./models/net.h5")
tfjs.converters.save_keras_model(model, './models')

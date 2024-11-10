import tensorflow as tf
import pandas as pd
from keras.preprocessing.text import Tokenizer
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.optimizers import Adam
from keras.preprocessing.sequence import pad_sequences
import numpy as np


def load_dataset(file_path):
    df = pd.read_csv(file_path)

    print(df.head())

    samples = df['text'].tolist()
    tokenizer = Tokenizer(num_words=10000)
    tokenizer.fit_on_texts(samples)

    sequences = tokenizer.texts_to_sequences(samples)

    max_len = 75  # Find max sequence length
    print(max_len)
    padded_sequences = pad_sequences(sequences, maxlen=max_len)

    print("Padded Sequences:")
    print(padded_sequences)

    # Example: Let's assume you have a 'label' column in your CSV for classification
    # Extract labels from the CSV (adjust column name as needed)
    labels = df['label'].values

    # If the labels are categorical, make sure to encode them appropriately
    # For binary classification: Convert to a NumPy array
    labels = np.array(labels)

    return padded_sequences, labels, max_len


# Load data from CSV
xs, ys, max_len = load_dataset('./data/training.csv')

# Step 2: Define and compile the model
model = Sequential()
model.add(Dense(16, input_dim=75, activation='relu'))
model.add(Dense(8, activation='relu'))
model.add(Dense(8, activation='relu'))
model.add(Dense(7, activation='softmax'))


# Compile the model
model.compile(optimizer=Adam(),
              loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Step 3: Train the model


model.fit(xs, ys, epochs=50, batch_size=10, shuffle=True, verbose=1)
print("Training complete")

x1s, y1s, _ = load_dataset('./data/test.csv')

t = model.evaluate(x1s, y1s)
model.save(f"./models/net.h5")
print(t[1])

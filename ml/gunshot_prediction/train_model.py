import os
import librosa
import numpy as np
import pandas as pd

from tensorflow.keras.models import Sequential
from tensorflow.keras.utils import to_categorical
from sklearn.model_selection import train_test_split
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout


# Загрузка и подготовка данных
metadata_path = os.path.join("filtered_dataset", "filtered_UrbanSound8K.csv")
audio_dir = os.path.join("filtered_dataset")
metadata = pd.read_csv(metadata_path)


def extract_features(file_path, max_duration=4, n_mels=128, target_length=130):
    try:
        y, sr = librosa.load(file_path, sr=16000, duration=max_duration)
        mel_spec = librosa.feature.melspectrogram(y=y, sr=sr, n_mels=n_mels)
        mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)

        if mel_spec_db.shape[1] < target_length:
            pad_width = target_length - mel_spec_db.shape[1]
            mel_spec_db = np.pad(mel_spec_db, ((0, 0), (0, pad_width)), mode='constant')
        elif mel_spec_db.shape[1] > target_length:
            mel_spec_db = mel_spec_db[:, :target_length]
        
        return mel_spec_db
    except Exception as e:
        print(f"Ошибка при обработке файла {file_path}: {e}")
        return None


features = []
labels = []
target_length = 130

for index, row in metadata.iterrows():
    file_path = os.path.join(audio_dir, row['class'], row['slice_file_name'])
    label = row['classID']
    
    mel_spec_db = extract_features(file_path, target_length=target_length)
    if mel_spec_db is not None:
        features.append(mel_spec_db)
        labels.append(label)

X = np.array([f.T for f in features])
y = np.array(labels)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


# Создание модели
print(np.unique(y))
print("MINMAXBEBRA", np.min(y), np.max(y))
num_classes = len(np.unique(y))

unique_labels = np.unique(y)
label_mapping = {label: idx for idx, label in enumerate(unique_labels)}

y_train_encoded = np.array([label_mapping[label] for label in y_train])
y_test_encoded = np.array([label_mapping[label] for label in y_test])

y_train_one_hot = to_categorical(y_train_encoded, num_classes)
y_test_one_hot = to_categorical(y_test_encoded, num_classes)

X_train = X_train[..., np.newaxis]
X_test = X_test[..., np.newaxis]

model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(X_train.shape[1], X_train.shape[2], 1)),
    MaxPooling2D((2, 2)),
    Dropout(0.3),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Dropout(0.3),
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(num_classes, activation='softmax')
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])


# Обучение модели
history = model.fit(X_train, y_train_one_hot, epochs=15, batch_size=32, validation_split=0.2)

# Оценка и сохранение модели
test_loss, test_acc = model.evaluate(X_test, y_test_one_hot)
print(f"Точность на тестовом наборе: {test_acc:.2f}")

model.save("./models/gunshot_predict.h5")

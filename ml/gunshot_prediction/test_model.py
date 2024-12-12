import joblib
import librosa
import numpy as np

from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.models import load_model


def predict_gunshot_probability(audio_file, model_path, threshold=0.7, label_encoder=None):
    try:
        audio, sample_rate = librosa.load(audio_file)
    except FileNotFoundError:
        print(f"Файл {audio_file} не найден.")
        return None

    # Извлечение MFCC признаков
    mfccs_features = librosa.feature.mfcc(y=audio, sr=sample_rate, n_mfcc=64)
    mfccs_scaled_features = np.mean(mfccs_features.T, axis=0)
    mfccs_scaled_features = mfccs_scaled_features.reshape(1, -1)

    try:
        model = load_model(model_path)
    except Exception as e:
        print(f"Ошибка загрузки модели: {e}")
        return None

    # Предсказание вероятностей для каждого класса
    predictions = model.predict(mfccs_scaled_features)

    if label_encoder:
        class_indices = list(label_encoder.classes_)
        gunshot_index = class_indices.index("gun_shot")
        gunsh0t_index = class_indices.index("dog_bark")
    else:
        gunshot_index = 0
        gunsh0t_index = None

    combined_probability = max(predictions[0][gunshot_index], predictions[0][gunsh0t_index])

    if combined_probability >= threshold:
        print(f"Звук выстрела обнаружен с вероятностью {combined_probability:.2f}.")
        return "gunshot", combined_probability
    else:
        print(f"Звук выстрела не обнаружен. Вероятность: {combined_probability:.2f}.")
        return "no_gunshot", combined_probability

if __name__ == "__main__":
    audio_file = "./audio/gunshot_3.wav"
    model_path = "./models/gunshot_predict.h5"

    try:
        label_encoder = joblib.load('./models/labelencoder.pkl')
        print("LabelEncoder успешно загружен.")
    except Exception as e:
        print(f"Ошибка при загрузке LabelEncoder: {e}")
        label_encoder = None

    predict_gunshot_probability(audio_file, model_path, threshold=0.7, label_encoder=label_encoder)

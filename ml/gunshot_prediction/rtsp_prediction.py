import os
import joblib
import librosa
import subprocess
import numpy as np

from datetime import datetime
from dotenv import load_dotenv
from tempfile import NamedTemporaryFile
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.models import load_model


load_dotenv()

def extract_audio_from_rtsp(rtsp_url, duration=3):
    """
    Извлекает аудио из RTSP потока с указанной длительностью.
    """
    temp_audio_file = NamedTemporaryFile(suffix=".wav", delete=False).name

    command = [
        "ffmpeg", "-i", rtsp_url,
        "-t", str(duration),
        "-vn", "-ac", "1", "-ar", "16000", "-y", temp_audio_file
    ]

    try:
        subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Ошибка при извлечении аудио из RTSP потока: {e}")
        return None

    return temp_audio_file

def save_video_segment(rtsp_url, duration=3, output_folder="./saved_segments"):
    """
    Сохраняет часть видео из RTSP потока с указанной длительностью.
    """
    os.makedirs(output_folder, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = os.path.join(output_folder, f"segment_{timestamp}.mp4")

    command = [
        "ffmpeg", "-i", rtsp_url,
        "-t", str(duration),
        "-c:v", "copy", "-c:a", "copy", "-y", output_file
    ]

    try:
        subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
        print(f"Сегмент видео сохранён: {output_file}")
    except subprocess.CalledProcessError as e:
        print(f"Ошибка при сохранении сегмента видео: {e}")

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

    predictions = model.predict(mfccs_scaled_features)

    if label_encoder:
        gunshot_index = list(label_encoder.classes_).index("gun_shot")
    else:
        gunshot_index = 0

    gunshot_probability = predictions[0][gunshot_index]

    if gunshot_probability >= threshold:
        print(f"Звук выстрела обнаружен с вероятностью {gunshot_probability:.2f}.")
        return "gunshot", gunshot_probability
    else:
        print(f"Звук выстрела не обнаружен. Вероятность: {gunshot_probability:.2f}.")
        return "no_gunshot", gunshot_probability

def monitor_rtsp_stream(rtsp_url, model_path, label_encoder=None, check_interval=3, threshold=0.7):
    """
    Мониторинг RTSP потока с проверкой каждые `check_interval` секунд на наличие звуков выстрела.
    """
    while True:
        print("Извлечение аудио из RTSP потока...")
        temp_audio_file = extract_audio_from_rtsp(rtsp_url, duration=check_interval)

        if not temp_audio_file:
            print("Не удалось извлечь аудио. Пропускаем итерацию.")
            continue

        print("Проверка на звуки выстрела...")
        result = predict_gunshot_probability(temp_audio_file, model_path, threshold=threshold, label_encoder=label_encoder)

        if result and result[0] == "gunshot":
            print("Тревога! Звук выстрела обнаружен!")
            print("Сохранение сегмента видео...")
            save_video_segment(rtsp_url, duration=check_interval)

if __name__ == "__main__":
    rtsp_url = os.getenv("RTSP_URL")
    if not rtsp_url:
        print("Ошибка: Переменная окружения RTSP_URL не задана.")
        exit(1)

    model_path = "./models/gunshot_predict.h5"

    try:
        label_encoder = joblib.load('./models/labelencoder.pkl')
        print("LabelEncoder успешно загружен.")
    except Exception as e:
        print(f"Ошибка при загрузке LabelEncoder: {e}")
        label_encoder = None

    monitor_rtsp_stream(rtsp_url, model_path, label_encoder=label_encoder, check_interval=3, threshold=0.7)
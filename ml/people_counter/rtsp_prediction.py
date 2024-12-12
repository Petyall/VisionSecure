import os
import cv2
import time
import threading
import subprocess

from ultralytics import YOLO
from dotenv import load_dotenv
from fastapi.responses import JSONResponse
from fastapi import FastAPI, HTTPException


load_dotenv()

app = FastAPI()

FRAME_PATH = "captured_frame.jpg"
model = YOLO('best.pt')
RTSP_URL = os.getenv("rtsp_url_video")

people_counts = []
polling_active = False
polling_thread = None


def capture_frame():
    """
    Функция для захвата одного кадра из RTSP-потока с помощью FFmpeg
    """
    
    try:
        command = [
            "ffmpeg",
            "-y",
            "-i", RTSP_URL,
            "-frames:v", "1",
            "-q:v", "2",
            FRAME_PATH
        ]
        subprocess.run(command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    except subprocess.CalledProcessError as e:
        print(f"Ошибка при захвате кадра: {e.stderr.decode()}")


def people_counter():
    """
    Функция для подсчета количества людей на изображении
    """

    if not os.path.exists(FRAME_PATH):
        return 0

    image = cv2.imread(FRAME_PATH)
    image = cv2.flip(image, -1)
    if image is None:
        return 0

    results = model(image)
    people_count = 0
    for result in results:
        for box in result.boxes:
            if int(box.cls) == 0:
                people_count += 1

                x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
                cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(image, f'Person', (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    output_path = 'output.jpg'
    cv2.imwrite(output_path, image)

    return people_count


def polling_task():
    """
    Фоновая задача для опроса RTSP потока и подсчета людей
    """

    global people_counts, polling_active
    while polling_active:
        capture_frame()
        count = people_counter()
        people_counts.append(count)
        print(f"Добавлено количество людей: {count}")
        time.sleep(10)


@app.get("/start-polling")
def start_polling():
    """
    Эндпоинт для запуска опроса RTSP потока
    """

    global polling_active, polling_thread, people_counts

    if polling_active:
        return JSONResponse(content={"detail": "Опрос RTSP-потока уже запущен"}, status_code=400)

    polling_active = True
    people_counts = []
    polling_thread = threading.Thread(target=polling_task)
    polling_thread.start()
    return {"detail": "Начался опрос RTSP-потока"}


@app.get("/stop-polling")
def stop_polling():
    """
    Эндпоинт для остановки опроса RTSP потока и вычисления среднего количества людей
    """

    global polling_active, polling_thread

    if not polling_active:
        return JSONResponse(content={"detail": "Polling is not active."}, status_code=400)

    polling_active = False
    if polling_thread:
        polling_thread.join()
        polling_thread = None

    if people_counts:
        average_people = sum(people_counts) / len(people_counts)
    else:
        average_people = 0

    return {"detail": "Опрос RTSP-потока остановлен", "average_people": average_people}


@app.get("/capture-now")
def capture_now():
    """
    Эндпоинт для немедленного захвата кадра и подсчета людей
    """

    capture_frame()
    if not os.path.exists(FRAME_PATH):
        raise HTTPException(status_code=500, detail="Ошибка при попытке опроса RTSP-поток")

    peoples = people_counter()
    return {"peoples": peoples}


@app.get("/frame")
def get_frame():
    """
    Эндпоинт для получения последнего захваченного кадра
    """

    if not os.path.exists(FRAME_PATH):
        raise HTTPException(status_code=404, detail="Кадр не найден")

    peoples = people_counter()
    return {"peoples": peoples}

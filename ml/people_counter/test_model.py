import cv2

from ultralytics import YOLO


model = YOLO('best.pt')

for i in range(1, 7):
    image_path = f'./test_images/{i}.jpg'
    image = cv2.imread(image_path)

    results = model(image)

    people_count = 0
    for result in results:
        for box in result.boxes:
            if int(box.cls) == 0:
                people_count += 1
                x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
                cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(image, f'Person', (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    print(f'Количество людей на изображении: {people_count}')

    output_path = f'./test_images/output{i}.jpg'
    cv2.imwrite(output_path, image)

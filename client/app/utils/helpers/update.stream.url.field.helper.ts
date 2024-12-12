import { StreamUrl } from "@/app/_data/types";

interface FormData {
  name: string;
  stream_url: string | StreamUrl;
  location: string;
}

/**
 * Обновляет определённое поле stream_url, если stream_url является объектом.
 * Если stream_url — строка, возвращает неизмененные данные.
 * 
 * @param prevFormData Предыдущее состояние формы
 * @param key Ключ в объекте StreamUrl, который нужно обновить
 * @param value Новое значение для этого ключа
 * @returns Новый объект состояния формы
 */
export function updateStreamUrlField<K extends keyof StreamUrl>(
  prevFormData: FormData,
  key: K,
  value: StreamUrl[K]
): FormData {
  if (typeof prevFormData.stream_url === 'object') {
    return {
      ...prevFormData,
      stream_url: {
        ...prevFormData.stream_url,
        [key]: value,
      },
    };
  }

  // Если stream_url - не объект, возвращаем прежнее состояние.
  return prevFormData;
}

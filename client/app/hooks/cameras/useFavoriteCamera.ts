import { useState, useEffect } from 'react';
import { api } from '@/app/_data/api';
import { useAlertStore } from '@/app/_data/store';

type UseFavoriteCamera = {
  cameraId: number;
};

const useFavoriteCamera = ({ cameraId }: UseFavoriteCamera) => {
  const { addAlert, removeAlert } = useAlertStore();
  const [isFavorite, setFavorite] = useState<boolean>(false);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      const response = await api.favorite.getUserCameraById({ id: cameraId });
      setFavorite(Boolean(response));
    };

    fetchFavoriteStatus();
  }, [cameraId]);

  const toggleFavorite = async () => {
    removeAlert(0);
    if (isFavorite) {
      await api.favorite.delete({ id: cameraId  }).then((response) => {
        if (response.success) {
          addAlert('Камера успешно исключена из "Избранное"', 'warning');
        } else {
          addAlert('Ошибка удаления камеры из "Избранное"', 'error');
        }
      });
    } else {
      await api.favorite.add({ id: cameraId }).then((response) => {
        if (response.success) {
          addAlert('Камера успешно добавлена в "Избранное"', 'info');
        } else {
          addAlert('Ошибка добавления камеры в "Избранное"', 'error');
        }
      });
    }
    setFavorite((prev) => !prev);
  };

  return { isFavorite, toggleFavorite };
};

export { useFavoriteCamera };

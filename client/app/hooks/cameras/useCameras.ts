import { api } from '@/app/_data/api';
import { useAlertStore, useCameraStore, useModalWindowStore } from '@/app/_data/store';
import { Camera } from '@/app/_data/types';
import { useState } from 'react';

/**
 * Хук для работы с запросами по камерам
 * @returns 
 */
export const useCameras = () => {
  const { setAllCameras, setUserCameras } = useCameraStore();
  const { addAlert, removeAlert } = useAlertStore();
  const { closeModal } = useModalWindowStore();

  const [isLoading, setLoading] = useState<boolean>(true);

  const fetchGetAllCameras = async () => {
    setLoading(true);
    try {
      const getAllCamerasResponse = api.cameras.getAll();
      getAllCamerasResponse.then(response => {
        if (response.detail) {
          addAlert('При получении списка камер произошла ошибка', 'error');
          return;
        }
        if (response.cameras) {
          setAllCameras(response.cameras);
        } else {
          addAlert('Что-то пошло не так...', 'error');
        }
      });
      getAllCamerasResponse.catch(err => {
        addAlert(`Сетевая ошибка запроса: ${err}`, 'error');
        console.error(`Сетевая ошибка запроса: ${err}`);
      });
      getAllCamerasResponse.finally(() => {
        removeAlert(0);
        setLoading(false);
      });
    } catch (err) {
      addAlert(`Ошибка метода запроса: ${err}`, 'error');
      console.error(`Ошибка метода запроса: ${err}`);
    }
  };

  const fetchGetCameraById = async () => {
    try {
      setLoading(true);
    } catch (err) { }
  };

  const fetchGetAllUserCameras = async () => {
    try {
      setLoading(true);
    } catch (err) { }
  };

  const fetchGetUserCameras = async () => {
    try {
      setLoading(true);
    } catch (err) { }
  };

  const fetchGetCamerasByUser = async () => {
    try {
      setLoading(true);
    } catch (err) { }
  };

  const fetchAddCamera = async ({ body, reset }: { body: Pick<Camera, | 'name' | 'stream_url' | 'location'>, reset: () => void }) => {
    try {
      setLoading(true);
      const addCamera = api.cameras.add({ body });
      addCamera.then(response => {
        if (response.detail && !response.cameras) {
          addAlert(`${response.detail}`, 'error');
          console.error(`Create Net Error >>> ${response.detail}`);
          return;
        } else {
          setUserCameras(response?.cameras);
          addAlert(`Камера ${body.name} создана!`, 'info');
          reset();
        }
      });
      addCamera.catch(err => {
        addAlert(
          `Во время создания в системе произошла ошибка: ${err}.`,
          'error'
        );
        console.error(`Create Net Error >>> ${err}`);
      });
      addCamera.finally(() => {
        removeAlert(0);
        setLoading(false);
      });
    } catch (err) { }
  };

  const fetchEditCamera = async ({
    id,
    body
  }: {
    id: Pick<Camera, 'id'>;
    body: Pick<Camera, "name" | "stream_url" | "location">
  }) => {
    try {
      setLoading(true);
      const editCameraResponse = api.cameras.edit({ id, body });
      editCameraResponse.then(response => {
        if (response.detail) {
          addAlert(`${response.detail}`, 'error');
          return;
        }
        if (response.success) {
          fetchGetAllCameras();
          addAlert(`Камера обновлена!`, 'warning');
          closeModal();
        } else {
          addAlert(`Что-то пошло не так...`, 'error');
        }
      });
      editCameraResponse.catch(err => {
        addAlert(`Сетевая ошибка запроса: ${err}`, 'error');
        console.error(`Сетевая ошибка запроса: ${err}`);
      });
      editCameraResponse.finally(() => {
        removeAlert(0);
        setLoading(false);
      });
    } catch (err) {
      addAlert(`Ошибка метода запроса: ${err}`, 'error');
      console.error(`Ошибка метода запроса: ${err}`);
    }
  };

  const fetchDeleteCamera = async ({ id }: { id: Pick<Camera, 'id'> }) => {
    try {
      setLoading(true);
      const deleteCameraResponse = api.cameras.delete(id);
      deleteCameraResponse.then(response => {
        if (response.detail) {
          addAlert(`${response.detail}`, 'error');
          return;
        }
        if (response.success) {
          fetchGetAllCameras();
          addAlert(`Камера удалена!`, 'warning');
          closeModal();
        } else {
          addAlert(`Что-то пошло не так...`, 'error');
        }
      });
      deleteCameraResponse.catch(err => {
        addAlert(`Сетевая ошибка запроса: ${err}`, 'error');
        console.error(`Сетевая ошибка запроса: ${err}`);
      });
      deleteCameraResponse.finally(() => {
        removeAlert(0);
        setLoading(false);
      });
    } catch (err) {
      addAlert(`Ошибка метода запроса: ${err}`, 'error');
      console.error(`Ошибка метода запроса: ${err}`);
    }
  };

  return {
    isLoading,
    setLoading,
    fetchGetAllCameras,
    fetchGetCameraById,
    fetchGetAllUserCameras,
    fetchGetUserCameras,
    fetchGetCamerasByUser,
    fetchAddCamera,
    fetchEditCamera,
    fetchDeleteCamera,
  };
};

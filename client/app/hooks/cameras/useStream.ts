import { useState, useEffect } from 'react';
import { Camera } from '@/app/_data/types';
import { api } from '@/app/_data/api';
import { useAlertStore } from '@/app/_data/store';

type UseStream = Pick<Camera, 'id'>;
type Stream = MediaStream | string | null;

const useStream = ({ id }: UseStream) => {
  const { addAlert } = useAlertStore();
  const [stream, setStream] = useState<Stream>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const startStream = async () => {
      try {
        const response = await api.stream.start({ id });
        if (response.stream && isMounted) {
          setStream(response.stream);
        } else {
          throw new Error('Stream not available');
        }
      } catch (e) {
        if (isMounted) {
          addAlert('Не удалось получить поток с камеры', 'warning');
          setError(true);
        }
      }
    };

    const stopStream = async () => {
      try {
        const response = await api.stream.stop({ id });
        if (response.stream && isMounted) {
          setStream(response.stream);
        } else {
          throw new Error('Stream not available');
        }
      } catch (e) {
        if (isMounted) {
          addAlert('Не удалось отключить поток с камеры', 'warning');
          setError(true);
        }
      }
    };

    startStream();

    return () => {
      isMounted = false;
      if (stream instanceof MediaStream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      stopStream();
    };
  }, [id]);

  return { stream, error };
};

export { useStream };
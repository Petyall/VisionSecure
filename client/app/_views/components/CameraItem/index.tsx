// import { FC, useState, useEffect, useRef, SyntheticEvent } from 'react';
// import Link from 'next/link';
// import { Camera } from '@/app/_data/types';
// import { UserRole } from '@/app/_data/types/enums';
// import { useUserStore } from '@/app/_data/store';
// import { useStream } from '@/app/hooks';

// import { Title } from '../../_ui/typography/Title';
// import { Text } from '../../_ui/typography/Text';
// import cls from './index.module.scss';
// import { error } from 'console';

// interface CameraItemProps {
//   camera: Camera;
//   view?: boolean;
// }

// const CameraStreamError = () => (
//   <div className={cls.cameraStreamError}>
//     <Text textAlign="center">Нет подключения к камере.</Text>
//   </div>
// );

// const CameraItem: FC<CameraItemProps> = ({ camera, view }) => {
//   const { user } = useUserStore();
//   const isAccess = user && [UserRole.ROOT, UserRole.ADMIN].includes(user.role);
//   const [isVisible, setIsVisible] = useState(false);
//   const [isErrorStream, setErrorStream] = useState<boolean>(false);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   // const { stream, error } = useStream({ id: camera.id });

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       setIsVisible(entry.isIntersecting);
//     });
//     const videoElement = videoRef.current;
//     if (videoElement) observer.observe(videoElement);

//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   // useEffect(() => {
//   //   if (isVisible && videoRef.current && stream instanceof MediaStream) {
//   //     videoRef.current.srcObject = stream;
//   //   }
//   // }, [isVisible, stream]);

//   const handleOnError = (err: SyntheticEvent<HTMLVideoElement, Event>) => {
//     setErrorStream(true);
//     console.error(`Camera Stream Error >>> ${err.type}`);
//   };

//   const error = false;

//   return (
//     <div className={cls.cameraItem} data-view={view}>
//       {isErrorStream || error ? (
//         <CameraStreamError />
//       ) : (
//         // <video
//         //   ref={videoRef}
//         //   autoPlay
//         //   controls
//         //   muted
//         //   playsInline
//         //   width={480}
//         //   height={270}
//         //   onError={handleOnError}
//         // />
//         <iframe src="http://127.0.0.1:8000/stream/start/26"></iframe>
//         // <iframe src="C:\Users\petyal\Desktop\work\ipcamera\rtsp_streamer\cmd\server\streams\camera_26\index.m3u8"></iframe>
//       )}
//       {view && (
//         <>
//           <div className={cls.top}>
//             <Title type="h6">{`№ ${camera.id}. ${camera?.name}`}</Title>
//             <Text opacity={0.4}>{camera?.location}</Text>
//           </div>
//           <div className={cls.bottom}>
//             <Link href={`/dashboard/view/camera/${camera.id}`}>Открыть</Link>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export { CameraItem };



import { FC, useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import Hls from 'hls.js';

import { Camera } from '@/app/_data/types';
import { UserRole } from '@/app/_data/types/enums';
import { useUserStore } from '@/app/_data/store';
import cls from './index.module.scss';

interface CameraItemProps {
  camera: Camera;
  view?: boolean;
}

const CameraItem: FC<CameraItemProps> = ({ camera, view }) => {
  const { user } = useUserStore();
  const isAccess = user && [UserRole.ROOT, UserRole.ADMIN].includes(user.role);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentCamera, setCurrentCamera] = useState<number | null>(null);

  useEffect(() => {
    const loadStream = async () => {
      // if (!camera.id || currentCamera === camera.id) return;
      await stopStream();

      try {
        const response = await fetch(`/start/${camera.id}`, { method: 'POST' });
        if (!response.ok) {
          throw new Error('Failed to start stream');
        }

        const video = videoRef.current;
        if (video) {
          const hls = new (await import('hls.js')).default();
          const streamUrl = `C:/Users/petyal/Desktop/work/ipcamera/rtsp_streamer/cmd/server/streams/camera_${camera.id}/index.m3u8`;

          if (Hls.isSupported()) {
            hls.loadSource(streamUrl);
            hls.attachMedia(video);
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = streamUrl;
          }

          setCurrentCamera(camera.id);
        }
      } catch (error) {
        console.error('Error starting stream:', error);
      }
    };

    loadStream();

    return () => {
      stopStream();
    };
  }, []);

  const stopStream = async () => {
    if (!currentCamera) return;
    try {
      await fetch(`/stream/stop/${currentCamera}`, { method: 'GET' });
      setCurrentCamera(null);
    } catch (error) {
      console.error('Error stopping stream:', error);
    }
  };

  useEffect(() => {
    return () => {
      stopStream();
    };
  }, []);

  return (
    <div className={cls.cameraItem} data-view={view}>
      {/* <video
        ref={videoRef}
        controls
        autoPlay
        muted
        playsInline
        width={1024}
        height={768}
      /> */}
      <iframe src={`http://127.0.0.1:8000/stream/start/${camera.id}`}></iframe>
      {view && (
        <>
          <div className={cls.top}>
            <h6>{`№ ${camera.id}. ${camera?.name}`}</h6>
            <p style={{ opacity: 0.4 }}>{camera?.location}</p>
          </div>
          <div className={cls.bottom}>
            <Link href={`/dashboard/view/camera/${camera.id}`}>Открыть</Link>
          </div>
        </>
      )}
    </div>
  );
};

export { CameraItem };

import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCameraStore } from '@/app/_data/store';
import { Flex } from '@/app/_views/_layouts/Flex';
import cls from './index.module.scss';

interface CamListNavigationProps {
  favorites?: boolean;
}

const CamListNavigation: FC<CamListNavigationProps> = ({ favorites }) => {
  const router = useRouter();
  const { slag } = router.query;
  const currentSlag = Array.isArray(slag) && `${slag[0]}/${slag[1]}/${slag[2]}`;

  const { userCameras, favoritesCameras } = useCameraStore();
  const cameras = favorites ? favoritesCameras : userCameras;

  if (favorites && favoritesCameras?.length === 0) {
    return;
  }

  return (
    <nav className={cls.navigation}>
      <Flex>
        {cameras
          ?.sort((cam1, cam2) => cam1.id - cam2.id)
          .map((cam) => (
            <Link
              key={cam.id}
              href={`/dashboard/view/camera/${cam.id}`}
              className={
                currentSlag === `view/camera/${cam.id}` ? cls.active : ''
              }
            >
              <span>{`${cam.id}. «${cam.name}»`}</span>
            </Link>
          ))}
      </Flex>
    </nav>
  );
};

export { CamListNavigation };

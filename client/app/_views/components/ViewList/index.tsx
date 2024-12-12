import { FC, useEffect } from 'react';

import { api } from '@/app/_data/api';

import { Camera } from '@/app/_data/types';
import { CameraItem } from '@/app/_views/components/CameraItem';

import { Gallery } from '@/app/_views/components/Gallery';
import { CamListNavigation } from '@/app/_views/components/CamListNavigation';
import { EmptyCameras } from '@/app/_views/components/EmptyCameras';
import cls from './index.module.scss';

interface ViewListProps {
  cameras: Camera[];
  favorites?: boolean;
}

const ViewList: FC<ViewListProps> = ({ cameras, favorites }) => {
  if (favorites && cameras?.length === 0) {
    return <EmptyCameras favorites />;
  }

  return (
    <section className={cls.viewList}>
      <CamListNavigation favorites={favorites} />
      <Gallery>
        {cameras
          ?.sort((cam1, cam2) => cam1.id - cam2.id)
          .map((item, idx) => <CameraItem key={idx} view camera={item} />)}
      </Gallery>
    </section>
  );
};

export { ViewList };

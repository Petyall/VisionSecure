import { FC } from 'react';
import { Camera } from '@/app/_data/types';

import { Flex } from '@/app/_views/_layouts/Flex';
import { Title } from '@/app/_views/_ui/typography/Title';
import { Text } from '@/app/_views/_ui/typography/Text';
import { CameraItem } from '@/app/_views/components/CameraItem';
import { CamListNavigation } from '@/app/_views/components/CamListNavigation';

import cls from './index.module.scss';

interface CameraFrameProps {
  camera: Camera;
}

const CameraFrame: FC<CameraFrameProps> = ({ camera }) => {
  return (
    <section className={cls.cameraFrame}>
      <Flex flexDirection="column">
        <CamListNavigation />
        <article>
          <Title type="h3">{`${camera?.id} - ${camera?.name}`}</Title>
          <Text>{camera?.location}</Text>
          <div className={cls.cameraWrapper}>
            <CameraItem camera={camera} />
          </div>
          <hr />
          <Text opacity={0.6}>
            <b>Обновлена:</b>{' '}
            {camera?.updated_at
              ? new Date(camera.updated_at).toLocaleDateString('ru-Ru')
              : 'Нет данных'}
            {'.'}
          </Text>
          <Text opacity={0.6}>
            <b>Создана:</b>{' '}
            {camera?.created_at
              ? new Date(camera.created_at).toLocaleDateString('ru-Ru')
              : 'Нет данных'}
            {'.'}
          </Text>
        </article>
      </Flex>
    </section>
  );
};

export { CameraFrame };

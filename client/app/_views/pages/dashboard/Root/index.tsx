import { FC } from 'react';
import { useRouter } from 'next/router';

import { Tab as ITab } from '@/app/_data/types';
import { useCameraStore } from '@/app/_data/store';

import { Flex } from '@/app/_views/_layouts/Flex';
import { Container } from '@/app/_views/_layouts/Container';
import { Tabs } from '@/app/_views/_widgets/Tabs';

import { ViewList } from '@/app/_views/components/ViewList';
import { CameraFrame } from '@/app/_views/components/CameraFrame';

import { Users } from '@/app/_views/pages//Users';
import { UserCreate } from '@/app/_views/pages/Users/Create';
import { Cameras } from '@/app/_views/pages/Cameras';
import { CameraCreate } from '@/app/_views/pages/Cameras/Create';
import { Account } from '@/app/_views/pages/Account';

import cls from './index.module.scss';

interface RootProps {
  tabs: ITab[];
}

const Root: FC<RootProps> = ({ tabs }) => {
  const router = useRouter();
  const { slag } = router.query;

  const currentTab = Array.isArray(slag) ? slag[0] : slag;
  const subAction = Array.isArray(slag) && slag.length > 1 ? slag[1] : null;
  const camId = Array.isArray(slag) && slag.length > 2 ? Number(slag[2]) : null;

  const { userCameras, favoritesCameras } = useCameraStore();

  return (
    <section className={cls.root}>
      <Container>
        <Flex flexDirection="column">
          <article>
            <Tabs tabs={tabs} currentTab={currentTab || 'users'} />
            <div>
              {/* Логика для пользователей */}
              {currentTab === 'users' && !subAction && <Users />}
              {currentTab === 'users' && subAction === 'create' && <UserCreate />}

              {/* Логика для камер */}
              {currentTab === 'cameras' && !subAction && <Cameras />}
              {currentTab === 'cameras' && subAction === 'create' && (
                <CameraCreate />
              )}

              {/* Логика для галереи */}
              {currentTab === 'view' && !subAction && (
                <ViewList cameras={userCameras} />
              )}
              {currentTab === 'view' && subAction === 'camera' && camId && (
                <CameraFrame camera={userCameras[camId - 1]} />
              )}

              {/* Логика для Избранного */}
              {currentTab === 'favorites' && !subAction && (
                <ViewList favorites cameras={favoritesCameras} />
              )}

              {currentTab === 'account' && !subAction && <Account />}
              {currentTab === 'account' && subAction === 'edit' && (
                <p>Редактировать данные</p>
              )}
            </div>
          </article>
        </Flex>
      </Container>
    </section>
  );
};

export { Root };

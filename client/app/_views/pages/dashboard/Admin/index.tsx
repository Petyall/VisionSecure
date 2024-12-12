import { FC } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@/app/_views/_layouts/Container';

import { Tab as ITab } from '@/app/_data/types';

import { Flex } from '@/app/_views/_layouts/Flex';
import { Tabs } from '@/app/_views/_widgets/Tabs';
import cls from './index.module.scss';

interface AdminProps {
  tabs: ITab[];
}

const Admin: FC<AdminProps> = ({ tabs }) => {
  const router = useRouter();
  const { slag } = router.query;

  const currentTab = Array.isArray(slag) ? slag[0] : slag;
  const subAction = Array.isArray(slag) && slag.length > 1 ? slag[1] : null;
  const camId =
    Array.isArray(slag) &&
    slag.length === 1 &&
    !tabs.find((tab) => tab.slug === currentTab)
      ? currentTab
      : null;

  return (
    <section className={cls.root}>
      <Container>
        <Flex flexDirection="column">
          <article>
            <Tabs tabs={tabs} currentTab={currentTab || 'cameras'} />
            <div>
              {/* Логика для камер */}
              {currentTab === 'cameras' && !subAction && <p>CRUD камеры</p>}
              {currentTab === 'cameras' && subAction === 'create' && (
                <p>Создать камеру</p>
              )}
              {currentTab === 'cameras' && subAction === 'edit' && (
                <p>Редактировать камеру</p>
              )}
              {currentTab === 'cameras' && subAction === 'delete' && (
                <p>Удалить камеру</p>
              )}

              {/* Логика для галереи */}
              {currentTab === 'view' && !subAction && <p>Галерея</p>}
              {camId && <p>Просмотр камеры с ID: {camId}</p>}

              {currentTab === 'account' && !subAction && <p>Мои данные</p>}
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

export { Admin };
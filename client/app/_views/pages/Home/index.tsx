import { FC } from 'react';

import { useUserStore, useCameraStore } from '@/app/_data/store';
import { UserRole } from '@/app/_data/types/enums';

import { Container } from '@/app/_views/_layouts/Container';
import { Flex } from '@/app/_views/_layouts/Flex';
import { Tag } from '@/app/_views/_ui/badges/Tag';
import { Title } from '@/app/_views/_ui/typography/Title';
import { ViewList } from '@/app/_views/components/ViewList';

import cls from './index.module.scss';

const Home: FC = () => {
  const user = useUserStore((e) => e.user);
  const userCamera = useCameraStore((e) => e.userCameras);

  const fullName = `${user?.last_name} ${user?.first_name[0].toUpperCase()}. ${user?.paternal_name[0].toUpperCase()}`;

  return (
    <section className={cls.home}>
      <Container>
        <Flex flexDirection="column">
          <article>
            <Flex justifyContent="space-between">
              <Title type="h2">
                Добро пожаловать, {(user && fullName) || 'незнакомец'}!
              </Title>
              {user && user.role !== UserRole.USER && (
                <Tag>{`Mode: ${user?.role === UserRole.ROOT ? 'ROOT' : 'Администратор'}`}</Tag>
              )}
            </Flex>
            <ViewList cameras={userCamera} />
          </article>
        </Flex>
      </Container>
    </section>
  );
};

export { Home };

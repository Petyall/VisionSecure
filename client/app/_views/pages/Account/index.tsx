import { FC } from 'react';
import Link from 'next/link';

import { useCameraStore, useUserStore } from '@/app/_data/store';

import { Container } from '@/app/_views/_layouts/Container';
import { Title } from '@/app/_views/_ui/typography/Title';
import { Flex } from '@/app/_views/_layouts/Flex';
import { EditIcon } from '@/app/_views/_ui/svg_dynamic';
import { Button } from '@/app/_views/_ui/forms/buttons/Button';

import cls from './index.module.scss';

const Account: FC = () => {
  const { user } = useUserStore();
  const { userCameras, favoritesCameras } = useCameraStore();
  return (
    <section className={cls.account}>
      <Container>
        <article>
          <Flex flexDirection="column" gap="2rem">
            <Flex alignItems="center" justifyContent="space-between">
              <Title type="h3">{`${user?.last_name} ${user?.first_name} ${user?.paternal_name}`}</Title>
              <Button
                title={'Редактировать данные аккаунта'}
                type={'button'}
                ico={<EditIcon />}
                onClick={() => {
                  prompt('Скоро добавим изменеия');
                }}
              />
            </Flex>
            <Flex flexDirection="column" gap=".5rem">
              <Title type="h4">Контактная информация</Title>
              <Flex justifyContent="space-between">
                <small>Номер телефона: </small>
                <span>{user?.phone_number}</span>
              </Flex>
              <Flex justifyContent="space-between">
                <small>Эл. почта: </small>
                <span>{user?.email}</span>
              </Flex>
            </Flex>
            <Flex flexDirection="column" gap=".5rem">
              <Title type="h4">Роль</Title>
              <Flex justifyContent="space-between">
                <small>Вашему уровню доступен </small>
                <span>{user?.role}</span>
              </Flex>
            </Flex>
            <Flex flexDirection="column" gap=".5rem">
              <Title type="h4">Камеры</Title>
              <Flex justifyContent="space-between">
                <small>Все камеры: </small>
                <p>
                  {userCameras.length ? (
                    userCameras?.map((cam, idx) => (
                      <span key={cam.id}>
                        <Link href={`/dashboard/view/camera/${cam.id}`}>
                          {`${idx + 1}) ${cam?.name}`}
                        </Link>
                        {', '}
                      </span>
                    ))
                  ) : (
                    <span>отсутствуют.</span>
                  )}
                </p>
              </Flex>
              <Flex justifyContent="space-between">
                <small>Избранные камеры: </small>
                {favoritesCameras.length ? (
                  favoritesCameras?.map((cam, idx) => (
                    <span>
                      <Link
                        key={cam.id}
                        href={`/dashboard/view/camera/${cam.id}`}
                      >
                        {`${idx + 1}) ${cam?.name}`}
                      </Link>
                    </span>
                  ))
                ) : (
                  <span>отсутствуют.</span>
                )}
              </Flex>
            </Flex>
          </Flex>
        </article>
      </Container>
    </section>
  );
};

export { Account };

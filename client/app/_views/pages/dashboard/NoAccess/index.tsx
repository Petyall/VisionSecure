import { FC } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@/app/_views/_layouts/Container';
import { Flex } from '@/app/_views/_layouts/Flex';
import { Title } from '@/app/_views/_ui/typography/Title';
import { Text } from '@/app/_views/_ui/typography/Text';
import { Button } from '@/app/_views/_ui/forms/buttons/Button';
import cls from './index.module.scss';

const NoAccess: FC = () => {
  const { push } = useRouter();

  return (
    <section className={cls.noAccess}>
      <Container>
        <Flex flexDirection="column">
          <article>
            <Title textAlign="center">Отказ в доступе!</Title>
            <Text textAlign="center">
              Ваша роль не имеет права на просмотр данного раздела! Попробуйте
              пройти авторизацию снова.
            </Text>
            <Button
              type="button"
              title={'Авторизоваться'}
              onClick={() => push('/auth/signin')}
            >
              Авторизоваться
            </Button>
          </article>
        </Flex>
      </Container>
    </section>
  );
};

export { NoAccess };

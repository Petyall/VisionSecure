import { FC } from 'react';
import { contacts } from '@/app/_data/static';
import { Container } from '@/app/_views/_layouts/Container';
import { Flex } from '@/app/_views/_layouts/Flex';
import { Text } from '@/app/_views/_ui/typography/Text';
import { Title } from '@/app/_views/_ui/typography/Title';
import cls from './index.module.scss';

const Contacts: FC = () => {
  return (
    <section className={cls.contacts}>
      <Container>
        <Flex flexDirection="column">
          <Title type="h3">Отдел систем технического контроля</Title>
          {contacts.map((item, idx) => (
            <article key={idx} className={cls.article}>
              <Flex gap=".5rem">
                {item.ico}
                <Text>{item.label}</Text>
              </Flex>
            </article>
          ))}
        </Flex>
      </Container>
    </section>
  );
};

export { Contacts };

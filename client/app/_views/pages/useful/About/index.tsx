import { FC } from 'react';
import Image from 'next/legacy/image';
import { camVisionInfo, tcsdEmployees, tcsdInfo } from '@/app/_data/static';
import { Container } from '@/app/_views/_layouts/Container';
import { Title } from '@/app/_views/_ui/typography/Title';
import { Text } from '@/app/_views/_ui/typography/Text';
import { Flex } from '@/app/_views/_layouts/Flex';

import cls from './index.module.scss';

const About: FC = () => {
  return (
    <section className={cls.about}>
      <Container>
        <article>
          <Flex flexDirection="column">
            <Flex flexGrow={1} flexDirection="column">
              <Title>CamVision</Title>
              {camVisionInfo.map((item, idx) => (
                <article key={idx} className={cls.article}>
                  <Title type="h4">{item.title}</Title>
                  {item.par &&
                    item.par.map((el, idx) => <Text key={idx}>{el}</Text>)}
                  {item.list && (
                    <ul>
                      {item.list.map((el, idx) => (
                        <li key={idx}>{`${idx + 1}) ${el}`}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </Flex>
            <Flex flexGrow={1}>
              {tcsdInfo.map((item, idx) => (
                <article key={idx} className={cls.article}>
                  <Title type="h4">{item.title}</Title>
                  {item.list && (
                    <ul>
                      {item.list.map((el, idx) => (
                        <li key={idx}>{`${idx + 1}. ${el}`}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </Flex>
            <Flex flexGrow={1}>
              {tcsdEmployees.map((item, idx) => (
                <article key={idx} className={cls.article}>
                  <Title type="h4">Сотрудники</Title>
                  <Flex gap="1rem">
                    <div className={cls.imageContainer}>
                      <Image
                        width={320}
                        height={470}
                        src={item.picLink}
                        alt={`person pic ${item.name}`}
                      />
                    </div>
                    <Flex flexDirection="column" gap="1rem">
                      <Title type="h5">{item.name}</Title>
                      <Text opacity={0.7}>{`Должность: ${item.post}`}</Text>
                      <Text opacity={0.7}>{`Тел.: ${item.phoneNumber}`}</Text>
                      <Text opacity={0.7}>{`Эл. почта: ${item.email}`}</Text>
                      <a href={item.more}>Читать подробнее 👈</a>
                    </Flex>
                  </Flex>
                </article>
              ))}
            </Flex>
          </Flex>
        </article>
      </Container>
    </section>
  );
};

export { About };

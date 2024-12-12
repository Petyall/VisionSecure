import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useUserStore } from '@/app/_data/store';
import { contacts, resources } from '@/app/_data/static';

import { Flex } from '../../_layouts/Flex';
import { Container } from '../../_layouts/Container';
import { Logo } from '../../_ui/badges/Logo';
import { Title } from '../../_ui/typography/Title';
import { Text } from '../../_ui/typography/Text';

import cls from './index.module.scss';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  const router = useRouter();
  const { isAuth } = useUserStore();

  return (
    <footer className={cls.footer}>
      <Container>
        <Flex justifyContent="space-between">
          <section className={cls.section}>
            <Title type="h4">Контакты: </Title>
            <ul className={cls.frame}>
              {contacts.map((item) => (
                <li key={item.id}>
                  {item.ico}
                  <Text>{item.label}</Text>
                </li>
              ))}
            </ul>
          </section>

          <section className={cls.section}>
            <Title type="h4">Ресурсы: </Title>
            <nav>
              {resources
                .filter((item) => (isAuth ? true : item.isPublic))
                .map((item) => (
                  <Link
                    key={item.path}
                    href={`${router.basePath}${item.path}`}
                    rel="noopener noreferrer"
                  >
                    {item.ico}
                    <span>{item.label}</span>
                  </Link>
                ))}
            </nav>
          </section>

          <section className={cls.section}>
            <Logo />
            <Text opacity={0.6} className={cls.copyWright}>
              &copy; {currentYear} All rights reserved
            </Text>
          </section>
        </Flex>
      </Container>
      <Container hr>
        <Text opacity={0.6} textAlign="center">
          344003, г. Ростов-на-Дону, пл. Гагарина, 1. ауд. 1-391а
        </Text>
      </Container>
    </footer>
  );
};

export { Footer };

import { FC } from 'react';
import { Container } from '../../_layouts/Container';
import { Logo } from '../../_ui/badges/Logo';
import { Flex } from '../../_layouts/Flex';
import { Burger } from '../../_ui/forms/buttons/Burger';
import cls from './index.module.scss';

const Header: FC = () => {
  return (
    <header className={cls.header}>
      <Container>
        <Flex justifyContent="space-between">
          <Flex gap="4rem">
            <Logo />
          </Flex>
          <Flex>
            <Burger />
          </Flex>
        </Flex>
      </Container>
    </header>
  );
};

export { Header };

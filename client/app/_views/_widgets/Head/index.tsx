import { FC, ReactNode } from 'react';
import { Title } from '../../_ui/typography/Title';
import { Flex } from '../../_layouts/Flex';
import { Container } from '../../_layouts/Container';
import { BackButton } from '../../_ui/forms/buttons/BackButton';
import cls from './index.module.scss';

interface HeadProps {
  title: string;
  children?: ReactNode;
}

const Head: FC<HeadProps> = ({ title, children }) => {
  return (
    <section className={cls.head}>
      <Container>
        <Flex alignItems="center">
          <BackButton />
          <Title type="h2">{title}</Title>
          <Flex justifyContent="flex-end" flexGrow={1}>
            {children && children}
          </Flex>
        </Flex>
      </Container>
    </section>
  );
};

export { Head };

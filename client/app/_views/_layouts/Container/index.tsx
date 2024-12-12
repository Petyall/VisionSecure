import { FC, ReactNode } from 'react';
import cls from './index.module.scss';

interface ContainerProps {
  children: ReactNode;
  hr?: boolean;
}

const Container: FC<ContainerProps> = ({ children, hr }) => {
  return (
    <div className={cls.container} data-hr={hr}>
      {children}
    </div>
  );
};

export { Container };

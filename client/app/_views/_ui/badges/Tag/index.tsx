import { FC, ReactNode } from 'react';
import cls from './index.module.scss';

interface TagProps {
  children: ReactNode;
}

const Tag: FC<TagProps> = ({ children }) => {
  return (
    <span className={cls.teg}>
      <b>{children}</b>
    </span>
  );
};

export { Tag };

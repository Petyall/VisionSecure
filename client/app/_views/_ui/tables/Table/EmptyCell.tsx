import { FC, ReactNode } from 'react';
import cls from './index.module.scss';

interface EmptyCellProps {
  children: ReactNode;
}

const EmptyCell: FC<EmptyCellProps> = ({ children }) => {
  const emptyCell = <tr className={cls.emptyCell}>{children}</tr>;

  return emptyCell;
};

export { EmptyCell };

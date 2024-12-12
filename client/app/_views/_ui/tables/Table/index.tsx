import { FC, ReactNode } from 'react';

import { useShrinkStore } from '@/app/_data/store';

import { TableHead } from './TableHead';
import { TableBody } from './TableBody';
import { TableRow } from './TableRow';
import { TableHeadCell } from './TableHeadCell';
import { TableBodyCell } from './TableBodyCell';
import { EmptyCell } from './EmptyCell';
import { ShrinkButton } from '../../forms/buttons/ShrinkButton';
import cls from './index.module.scss';

interface TableProps {
  children: ReactNode;
}

const Table: FC<TableProps> & {
  Head: typeof TableHead;
  Body: typeof TableBody;
  Row: typeof TableRow;
  HeadCell: typeof TableHeadCell;
  BodyCell: typeof TableBodyCell;
  EmptyCell: typeof EmptyCell;
} = ({ children, ...props }) => {
  const { isShrink } = useShrinkStore();

  return (
    <div className={cls.tableContainer}>
      <div className={cls.tableWrapper}>
        <ShrinkButton />
        <table
          className={`${cls.table} ${isShrink ? `${cls.shrink}` : ''}`}
          {...props}
        >
          {children}
        </table>
      </div>
    </div>
  );
};

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.HeadCell = TableHeadCell;
Table.BodyCell = TableBodyCell;
Table.EmptyCell = EmptyCell;

export { Table };

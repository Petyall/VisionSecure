import { FC, ReactNode, useState } from 'react';
import { ArrowSolidIcon } from '../../svg_dynamic';
import cls from './index.module.scss';

interface TableHeadCellProps {
  children: ReactNode;
  sortable?: boolean;
  onClick?: () => void;
}

const TableHeadCell: FC<TableHeadCellProps> = ({
  sortable,
  onClick,
  ...props
}) => {
  const [toggle, setToggle] = useState(false);

  return (
    <th
      className={cls.theadCell}
      data-sortable={sortable?.toString()}
      onClick={onClick}
      {...props}
    >
      <p className={cls.line} onClick={() => setToggle((prev) => !prev)}>
        <span>{props.children}</span>
        {sortable && (
          <span
            className={toggle ? `${cls.icon} ${cls.iconRot}` : `${cls.icon}`}
          >
            <ArrowSolidIcon />
          </span>
        )}
      </p>
    </th>
  );
};

export { TableHeadCell };

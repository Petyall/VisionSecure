import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';
import cls from './index.module.scss';

interface FlexProps {
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  alignItems?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline';
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  flexGrow?: number;
  gap?: string;
  children: ReactNode;
  className?: string;
}

const Flex: FC<FlexProps> = ({
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  flexDirection = 'row',
  flexWrap = 'nowrap',
  gap = '1rem',
  flexGrow,
  children,
  className = '',
}) => {
  return (
    <div
      className={clsx(
        cls.flex,
        cls[`justify-${justifyContent}`],
        cls[`align-${alignItems}`],
        cls[`direction-${flexDirection}`],
        cls[`wrap-${flexWrap}`],
        className
      )}
      style={{ gap, flexGrow: flexGrow }}
    >
      {children}
    </div>
  );
};

export { Flex };

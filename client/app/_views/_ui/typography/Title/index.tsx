import React, { FC } from 'react';
import cls from './index.module.scss';

interface TitleProps {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  opacity?: number;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: string;
  children: React.ReactNode;
  className?: string;
}

const Title: FC<TitleProps> = ({
  type = 'h2',
  opacity = 1,
  textAlign = 'left',
  lineHeight = '1.5',
  children,
  className = '',
}) => {
  const Tag = type;

  return (
    <Tag
      className={`${cls.title} ${className}`}
      data-opacity={opacity}
      data-text-align={textAlign}
      data-line-height={lineHeight}
    >
      {children}
    </Tag>
  );
};

export { Title };

import React, { FC } from 'react';
import cls from './index.module.scss';

enum FontSizeType {
  MIN = 'min',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  EL = 'el',
  MAX = 'max',
}

interface TextProps {
  opacity?: number;
  fontSize?: FontSizeType;
  fontWeight?: 'normal' | 'bold' | 'lighter' | number;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: string;
  children: React.ReactNode;
  className?: string;
}

const Text: FC<TextProps> = ({
  opacity = 1,
  fontSize = FontSizeType.MD,
  fontWeight = 'normal',
  textAlign = 'left',
  lineHeight = '1.5',
  children,
  className = '',
}) => {
  return (
    <p
      className={`${cls.text} ${className}`}
      style={{ opacity: opacity }}
      data-font-size={fontSize}
      data-font-weight={fontWeight}
      data-text-align={textAlign}
      data-line-height={lineHeight}
    >
      {children}
    </p>
  );
};

export { Text };

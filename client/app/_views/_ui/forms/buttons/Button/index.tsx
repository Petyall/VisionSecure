import { FC, ReactNode } from 'react';
import cls from './index.module.scss';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  title: string;
  ico?: ReactNode;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  type,
  title,
  ico,
  children,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      title={title}
      className={cls.button}
      {...props}
      disabled={disabled}
      onClick={onClick}
    >
      {ico}
      {children && <span>{children}</span>}
    </button>
  );
};

export { Button };

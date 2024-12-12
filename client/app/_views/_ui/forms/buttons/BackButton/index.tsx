import { FC } from 'react';
import { useRouter } from 'next/router';
import { ArrowRightIcon } from '../../../svg_dynamic';
import cls from './index.module.scss';

interface BackButtonProps {
  path?: string | null;
}

const BackButton: FC<BackButtonProps> = ({ path }) => {
  const { push, back } = useRouter();

  const handleClick = () => {
    if (path && path.trim().length > 0) push(path);
    else back();
  };

  return (
    <button className={cls.backButton} onClick={handleClick}>
      <ArrowRightIcon />
    </button>
  );
};

export { BackButton };

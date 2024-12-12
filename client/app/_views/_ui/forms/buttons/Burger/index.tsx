import { FC } from 'react';
import { useOffcanvasStore } from '@/app/_data/store';
import { CloseIcon, MenuIcon } from '../../../svg_dynamic';
import cls from './index.module.scss';

const Burger: FC = () => {
  const { isOpen, toggleOffcanvas } = useOffcanvasStore();

  return (
    <button className={cls.burger} type="button" onClick={toggleOffcanvas}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </button>
  );
};

export { Burger };

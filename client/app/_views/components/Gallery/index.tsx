import { FC, ReactNode } from 'react';
import cls from './index.module.scss';

interface GalleryProps {
  children: ReactNode;
}

const Gallery: FC<GalleryProps> = ({ children }) => {
  return <div className={cls.gallery}>{children}</div>;
};

export { Gallery };

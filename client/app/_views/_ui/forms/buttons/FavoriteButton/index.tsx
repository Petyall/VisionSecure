import { FC } from 'react';

import { useFavoriteCamera } from '@/app/hooks';

import { StarIcon, CrossStareIcon } from '../../../svg_dynamic';
import cls from './index.module.scss';

interface FavoriteButtonProps {
  cameraId: number;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({ cameraId }) => {
  const { isFavorite, toggleFavorite } = useFavoriteCamera({
    cameraId: cameraId,
  });

  const handleToggle = () => {
    toggleFavorite();
  };

  return (
    <button
      type="button"
      title={
        isFavorite
          ? 'Удалить камеру из избранного'
          : 'Добавить камеру в избранное'
      }
      data-favorite={isFavorite}
      className={cls.favoriteButton}
      onClick={handleToggle}
    >
      {isFavorite ? <StarIcon /> : <CrossStareIcon />}
    </button>
  );
};

export { FavoriteButton };

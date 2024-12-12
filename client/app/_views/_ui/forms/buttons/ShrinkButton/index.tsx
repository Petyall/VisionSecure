import { FC, useEffect } from 'react';
import { useShrinkStore } from '@/app/_data/store';
import { ShrinkOnIcon, ShrinkOffIcon } from '@/app/_views/_ui/svg_dynamic';
import cls from './index.module.scss';

const ShrinkButton: FC = () => {
  const { isShrink, setShrink, toggleShrink } = useShrinkStore();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1400px)');
    setShrink(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => {
      setShrink(e.matches);
    };

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, [setShrink]);

  return (
    <button
      type="button"
      title={isShrink ? 'Сузить' : 'Расширить'}
      className={cls.shrinkButton}
      onClick={toggleShrink}
    >
      {isShrink ? <ShrinkOffIcon /> : <ShrinkOnIcon />}
    </button>
  );
};

export { ShrinkButton };

import { useThemeStore } from '@/app/_data/store';
import { SunIcon, MoonIcon } from '../../../svg_dynamic';
import cls from './index.module.scss';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      className={cls.themeToggle}
      onClick={toggleTheme}
      type="button"
      role="button"
      tabIndex={0}
    >
      <span className={cls.iconWrapper}>
        <SunIcon />
        <MoonIcon />
      </span>
      <span className={cls.switch}>
        <span
          className={`${cls.slider} ${theme === 'dark' ? cls.sliderDark : cls.sliderLight}`}
        />
      </span>
    </button>
  );
};

export { ThemeToggle };

import { FC } from 'react';
import cls from './index.module.scss';

interface SwitchProps {
  label: string;
  clue?: string;
  isToggled: boolean;
  onToggled: () => void;
}

const Switch: FC<SwitchProps> = ({ label, clue, isToggled, onToggled }) => (
  <div className={cls.wrapper}>
    <div className={cls.line}>
      {label && <label className={cls.label}>{label}</label>}
      <div className={cls.switchContainer}>
        <input
          className={cls.input}
          type="checkbox"
          checked={isToggled}
          onChange={onToggled}
          aria-label={label}
          aria-checked={isToggled}
        />
        <span className={cls.slider} />
      </div>
    </div>
    {clue && <span className={cls.clue}>{clue}</span>}
  </div>
);

export { Switch };

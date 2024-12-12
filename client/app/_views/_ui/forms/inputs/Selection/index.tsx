import { useRef, useState } from 'react';
import { useClickOutside } from '@/app/hooks';
import cls from './index.module.scss';

interface SelectionProps<T> {
  label: string;
  clue?: string;
  options: T[];
  value: T;
  onChange: (value: T) => void;
}

const Selection = <T extends string | number | boolean>({
  label,
  clue,
  options,
  value,
  onChange,
}: SelectionProps<T>) => {
  const selectionRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: T) => {
    onChange(option);
    close();
  };

  const close = () => {
    setIsOpen(false);
  };

  useClickOutside(selectionRef, close);

  return (
    <div className={cls.selection} ref={selectionRef}>
      {label && (
        <label className={isOpen ? `${cls.label} ${cls.open}` : cls.label}>
          {label}
        </label>
      )}
      <button type="button" className={cls.control} onClick={handleToggle}>
        {String(value).toUpperCase()}
      </button>
      {isOpen && (
        <ul className={cls.menu}>
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {String(option)}
            </li>
          ))}
        </ul>
      )}
      {clue && <span className={cls.clue}>{clue}</span>}
    </div>
  );
};

export { Selection };

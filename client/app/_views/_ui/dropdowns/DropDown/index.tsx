import React from 'react';
import cls from './index.module.scss';

interface DropDownProps<T> {
  name: string;
  dropList: T[];
}

const DropDown = <T,>({ name, dropList }: DropDownProps<T>) => {
  return (
    <div className={cls.dropWrapper}>
      <button>
        <span>{name}</span>
        arrowDownIcon
      </button>
      <div className={cls.drop}>
        {dropList.map((item, idx) => (
          <li key={idx}>item</li>
        ))}
      </div>
    </div>
  );
};

export default DropDown;

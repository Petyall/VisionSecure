import React from 'react';
import cls from './index.module.scss';

const SkeletonFrame = () => {
  return (
    <div className={cls.skeletonFrame}>
      <div className={cls.skeleton}></div>
    </div>
  );
};

export { SkeletonFrame };

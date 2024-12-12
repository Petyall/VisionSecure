import { FC } from 'react';
import Link from 'next/link';
import { useUserStore } from '@/app/_data/store';
import { Flex } from '@/app/_views/_layouts/Flex';
import { LogoIcon } from '../../svg_dynamic';
import cls from './index.module.scss';

const Logo: FC = () => {
  const { isAuth } = useUserStore();

  return (
    <Link href={isAuth ? '/' : '/auth/signin'} className={cls.logo}>
      <Flex gap=".5rem" alignItems="flex-end">
        <LogoIcon />
        <span>VisionSecure</span>
      </Flex>
    </Link>
  );
};

export { Logo };

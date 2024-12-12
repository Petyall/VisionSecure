import { ReactNode } from 'react';
import {
  BlocksIcon,
  BookIcon,
  PhoneIcon,
  DocIcon,
} from '@/app/_views/_ui/svg_dynamic';
import { P108 } from '../../urls';

interface ResourcesItem {
  label: string;
  path: string;
  ico: ReactNode;
  isPublic: boolean;
}

export const resources: ResourcesItem[] = [
  {
    label: 'О Системе',
    path: '/useful/about',
    ico: <BookIcon />,
    isPublic: true,
  },
  {
    label: 'Список камеры',
    path: '/dashboard/view/',
    ico: <BlocksIcon />,
    isPublic: false,
  },
  {
    label: 'Контакты',
    path: '/useful/contact',
    ico: <PhoneIcon />,
    isPublic: true,
  },
  {
    label: 'Положение об ОСТК № 108',
    path: P108,
    ico: <DocIcon />,
    isPublic: true,
  },
];

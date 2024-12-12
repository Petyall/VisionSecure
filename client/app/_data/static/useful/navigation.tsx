import { ReactNode } from 'react';
import {
  HomeIcon,
  CamerasIcon,
  UsersIcon,
  UserIcon,
  StarIcon,
} from '@/app/_views/_ui/svg_dynamic';
import { CameraIcon } from '@/app/_views/_ui/svg_dynamic/svgs.module';
import { UserRole } from '../../types/enums';

interface NavItem {
  label: string;
  path: string;
  ico: ReactNode;
  isDashboard: boolean;
  allowedRoles: string[];
}

export const navigation: NavItem[] = [
  {
    label: 'Главная',
    path: '/',
    ico: <HomeIcon />,
    isDashboard: false,
    allowedRoles: [UserRole.USER, UserRole.ADMIN, UserRole.ROOT],
  },
  {
    label: 'Профиль',
    path: '/dashboard/account',
    ico: <UserIcon />,
    isDashboard: false,
    allowedRoles: [UserRole.USER, UserRole.ADMIN, UserRole.ROOT],
  },
  {
    label: 'Избранное',
    path: '/dashboard/favorites',
    ico: <StarIcon />,
    isDashboard: false,
    allowedRoles: [UserRole.USER, UserRole.ADMIN, UserRole.ROOT],
  },

  {
    label: 'Галерея',
    path: '/dashboard/view',
    ico: <CameraIcon />,
    isDashboard: true,
    allowedRoles: [UserRole.USER, UserRole.ADMIN, UserRole.ROOT],
  },
  {
    label: 'Избранное',
    path: '/dashboard/favorites',
    ico: <StarIcon />,
    isDashboard: true,
    allowedRoles: [UserRole.USER, UserRole.ADMIN, UserRole.ROOT],
  },
  {
    label: 'Камеры',
    path: '/dashboard/cameras',
    ico: <CamerasIcon />,
    isDashboard: true,
    allowedRoles: [UserRole.ADMIN, UserRole.ROOT],
  },
  {
    label: 'Пользователи',
    path: '/dashboard/users',
    ico: <UsersIcon />,
    isDashboard: true,
    allowedRoles: [UserRole.ROOT],
  },
];

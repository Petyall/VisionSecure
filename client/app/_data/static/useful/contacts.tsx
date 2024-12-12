import { ReactNode } from 'react';
import {
  EmailIcon,
  MapMarkerIcon,
  PhoneIcon,
  SettingsIcon,
} from '@/app/_views/_ui/svg_dynamic';

interface ContactsItem {
  id: number;
  label: string;
  ico: ReactNode;
}

export const contacts: ContactsItem[] = [
  {
    id: 0,
    label: 'Пн.-Пт.: 8:30 - 17:00',
    ico: <SettingsIcon />,
  },
  {
    id: 1,
    label: 'корпус 1, ауд. 391а',
    ico: <MapMarkerIcon />,
  },
  {
    id: 2,
    label: '238-17-13',
    ico: <PhoneIcon />,
  },
  {
    id: 3,
    label: 'spanov@donstu.ru',
    ico: <EmailIcon />,
  },
];

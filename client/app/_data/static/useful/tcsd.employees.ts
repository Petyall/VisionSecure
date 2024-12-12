import { formatPhoneNumber } from '@/app/utils/formats';
import panov from '@/app/public/pics/about/panov.webp';

interface TcsdEmployee {
  name: string;
  post: string;
  picLink: string;
  phoneNumber: string;
  email: string;
  more: string;
}

export const tcsdEmployees: TcsdEmployee[] = [
  {
    name: 'Панов Сергей Владимирович',
    post: 'Начальник отдела',
    picLink: panov.src,
    phoneNumber: formatPhoneNumber('78632381713'),
    email: 'serxeo@gmail.com',
    more: 'https://donstu.ru/employees/panov-sergey-vladimirovich/',
  },
];

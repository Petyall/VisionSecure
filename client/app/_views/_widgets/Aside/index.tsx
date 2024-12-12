import { FC } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { navigation } from '@/app/_data/static';
import { requestToRegistrationMailForm } from '@/app/_data/urls';

import { useUserStore, useCameraStore } from '@/app/_data/store';

import { useLogout } from '@/app/hooks';

import { Flex } from '../../_layouts/Flex';
import { Container } from '../../_layouts/Container';
import { Button } from '../../_ui/forms/buttons/Button';
import { Text } from '../../_ui/typography/Text';
import {
  ArrowLeftIcon,
  CameraIcon,
  EnterIcon,
  ExitIcon,
} from '../../_ui/svg_dynamic';
import cls from './index.module.scss';

const Aside: FC = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const { user, isAuth } = useUserStore();
  const { userCameras } = useCameraStore();
  const { logout } = useLogout();

  const noUserAside = (
    <aside id={cls.noUser} className={cls.aside}>
      <Flex flexGrow={1} flexDirection="column" justifyContent="space-between">
        <Container>
          <Text>
            Запрос на регистрацию можно направить через{' '}
            <a href={requestToRegistrationMailForm}>почту</a>
          </Text>
        </Container>
        <Container hr>
          <Button
            type="button"
            title="Войти"
            ico={<EnterIcon />}
            onClick={() => push('auth/signin')}
          >
            Войти
          </Button>
        </Container>
      </Flex>
    </aside>
  );

  const aside = (
    <aside className={cls.aside}>
      <ul className={cls.list}>
        {userCameras?.sort().map((cam, idx) => (
          <li
            key={cam.id}
            tabIndex={idx}
            title={cam.name}
            className={
              pathname === `/dashboard/view/camera/${cam.id}`
                ? `${cls.item} ${cls.active}`
                : cls.item
            }
          >
            <Link href={`/dashboard/view/camera/${cam.id}`}>
              <CameraIcon />
              <span>{cam.name}</span>
              <ArrowLeftIcon />
            </Link>
          </li>
        ))}
      </ul>
      <Container hr>
        {user &&
          navigation
            .filter((el) => el.isDashboard)
            .filter((el) => el.allowedRoles.includes(user?.role))
            .map((item) => (
              <Link
                key={item.path}
                className={
                  pathname === item.path ? `${cls.tab} ${cls.active}` : cls.tab
                }
                href={item.path}
              >
                {item.ico}
                <span>{item.label}</span>
              </Link>
            ))}
      </Container>
      <Container hr>
        <Button
          ico={<ExitIcon />}
          type="button"
          title="Выйти из аккаунта"
          onClick={() => logout()}
        >
          Выйти
        </Button>
      </Container>
    </aside>
  );

  return isAuth ? aside : noUserAside;
};

export { Aside };

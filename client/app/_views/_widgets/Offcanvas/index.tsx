import { FC, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { contacts, navigation, resources } from '@/app/_data/static';
import { useUserStore, useOffcanvasStore } from '@/app/_data/store';
import { useClickOutside, useLogout } from '@/app/hooks';

import { Flex } from '../../_layouts/Flex';
import { Container } from '../../_layouts/Container';
import { Logo } from '../../_ui/badges/Logo';
import { ThemeToggle } from '../../_ui/forms/toggles/ThemeToggle';
import { Burger } from '../../_ui/forms/buttons/Burger';
import { Button } from '../../_ui/forms/buttons/Button';
import { Title } from '../../_ui/typography/Title';
import { ExitIcon } from '../../_ui/svg_dynamic';

import cls from './index.module.scss';

const Offcanvas: FC = () => {
  const router = useRouter();
  const offcanvasRef = useRef<HTMLDivElement>(null);
  const { user, isAuth } = useUserStore();
  const { logout } = useLogout();
  const { isOpen, closeOffcanvas } = useOffcanvasStore();

  useEffect(() => {
    closeOffcanvas();
  }, []);

  useClickOutside(offcanvasRef, closeOffcanvas);

  const handleLogout = () => {
    logout();
    closeOffcanvas();
  };

  return (
    <div className={isOpen ? `${cls.fade} ${cls.animate}` : cls.fade}>
      <div
        ref={offcanvasRef}
        className={isOpen ? `${cls.offcanvas} ${cls.open}` : cls.offcanvas}
      >
        <Container>
          <Flex flexDirection="column" justifyContent="space-between">
            <div className={cls.top}>
              <Logo />
              <Burger />
            </div>
            <div className={cls.middle}>
              {isAuth && (
                <>
                  <nav className={cls.navigation}>
                    <Title type="h4">Навигация:</Title>
                    {navigation
                      .filter((el) => !el.isDashboard)
                      .map((item) => (
                        <Link key={item.path} href={item.path}>
                          {item.ico}
                          <span>{item.label}</span>
                        </Link>
                      ))}
                  </nav>
                  <nav className={cls.navigation}>
                    <Title type="h4">Управление:</Title>
                    {user &&
                      navigation
                        .filter((el) => el.isDashboard)
                        .filter((el) => el.allowedRoles.includes(user?.role))
                        .map((item) => (
                          <Link key={item.path} href={item.path}>
                            {item.ico}
                            <span>{item.label}</span>
                          </Link>
                        ))}
                  </nav>
                </>
              )}
              <nav className={cls.navigation}>
                <Title type="h4">Ресурсы:</Title>
                {resources
                  .filter((item) => (isAuth ? true : item.isPublic))
                  .map((item) => (
                    <Link
                      key={item.path}
                      href={`${router.basePath}${item.path}`}
                    >
                      {item.ico}
                      <span>{item.label}</span>
                    </Link>
                  ))}
              </nav>
              <div className={cls.frame}>
                <Title type="h5">Контакты:</Title>
                <ul className={cls.list}>
                  {contacts.map((item) => (
                    <li key={item.id}>
                      {item.ico}
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={cls.bottom}>
              <Flex alignItems="flex-start">
                <ThemeToggle />
                {!isAuth ? (
                  <Button
                    type="button"
                    title="Войти"
                    onClick={() => router.push('/auth/signin')}
                  >
                    Войти
                  </Button>
                ) : (
                  <Button
                    type="button"
                    title="Выйти"
                    ico={<ExitIcon />}
                    onClick={handleLogout}
                  >
                    Выйти
                  </Button>
                )}
              </Flex>
            </div>
          </Flex>
        </Container>
      </div>
    </div>
  );
};

export { Offcanvas };

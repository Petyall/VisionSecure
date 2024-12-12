import { useRouter } from 'next/router';
import { api } from '@/app/_data/api';
import { useAlertStore, useUserStore } from '@/app/_data/store';
import { deleteCookie } from 'cookies-next';

export const useLogout = () => {
  const router = useRouter();
  const { setUserData } = useUserStore();
  const { setAuth } = useUserStore();
  const { addAlert, removeAlert } = useAlertStore();

  const logout = async () => {
    try {
      api.authentication.logout()
        .then((res) => {
          if (res.detail) {
            addAlert(`${res.detail}`, 'error');
            console.error(`Exit Error >>> ${res.detail}`);
            return;
          } else {
            localStorage.clear();
            setAuth(false);
            setUserData(null);
            deleteCookie('access_token');
            addAlert('Успешный выход из системы', 'info');
            router.push('/auth/signin');
          }
        })
        .catch((err) => {
          addAlert(
            `Во время выхода из системы произошла сетевая ошибка: ${err}.`,
            'error'
          );
          console.error(`Exit Net Error >>> ${err}`);
        })
        .finally(() => {
          removeAlert(0);
        });
    } catch (err) {
      addAlert(
        `Во время выхода из системы произошло исключение: ${err}.`,
        'error'
      );
      console.error(`Exit exception Error >>> ${err}`);
    }
  };

  return { logout };
};

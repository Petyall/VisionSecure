import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { deleteCookie } from 'cookies-next';
import { api } from '@/app/_data/api';
import { useThemeStore, useCameraStore, useUserStore } from '@/app/_data/store';
import { Loader } from '@/app/_views/_ui/loaders/Loader';
import '../app/styles/globals.scss';

function App({ Component, pageProps }: AppProps) {
  const { loadAuth, setUserData, setAuth, setLoad } = useUserStore();
  const { setUserCameras, setFavoritesCameras } = useCameraStore();
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    setLoad(true);

    const handleUnauthenticatedUser = () => {
      setAuth(false);
      setUserData(null);
      deleteCookie('access_token');
      console.error('User is unauthenticated');
    };

    const fetchUserCameras = async () => {
      try {
        const responseUserCameras = await api.cameras.getAllUsers();
        setUserCameras(responseUserCameras?.cameras);
      } catch {
        setUserCameras([]);
        console.error('Failed to fetch user cameras');
      }
    };

    const fetchFavoriteCameras = async () => {
      try {
        const responseFavoriteCameras = await api.favorite.getAllCamera();
        // setFavoritesCameras(responseFavoriteCameras?.cameras || []);
      } catch {
        setFavoritesCameras([]);
        console.error('Failed to fetch favorite cameras');
      }
    };

    const fetchUserData = async () => {
      try {
        const responseUser = await api.user.mySelf();
        if (!responseUser.user || responseUser.detail) {
          handleUnauthenticatedUser();
        } else {
          setAuth(true);
          setUserData(responseUser.user);
          await Promise.all([fetchUserCameras(), fetchFavoriteCameras()]);
        }
      } catch (error) {
        console.error('>>> Fetch User Data Error: ', error);
      } finally {
        setLoad(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  if (loadAuth) return <Loader />;
  return <Component {...pageProps} />;
}

export default function AppWrapper({ Component, pageProps, router }: AppProps) {
  return <App Component={Component} pageProps={pageProps} router={router} />;
}
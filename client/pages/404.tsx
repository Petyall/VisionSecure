import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <h1>404 - Страница не найдена</h1>
      <p>Перенаправляем вас на главную страницу...</p>
    </div>
  );
};

export default Custom404;

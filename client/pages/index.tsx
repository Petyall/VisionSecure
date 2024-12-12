import { Layout } from '@/app/_views/_layouts/Layout';
import { Home } from '@/app/_views/pages/Home';

export default function HomePage() {
  const seo = {
    title: 'VisionSecure',
    description:
      'VisionSecure предоставляет интуитивно понятный интерфейс для наблюдения за видео в реальном времени.',
  };

  return (
    <Layout seo={seo}>
      <Home />
    </Layout>
  );
}

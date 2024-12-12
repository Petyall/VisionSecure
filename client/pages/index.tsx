import { Layout } from '@/app/_views/_layouts/Layout';
import { Home } from '@/app/_views/pages/Home';

export default function HomePage() {
  const seo = {
    title: 'CamVision',
    description:
      'CamVision предоставляет интуитивно понятный интерфейс для наблюдения за видео в реальном времени.',
  };

  return (
    <Layout seo={seo}>
      <Home />
    </Layout>
  );
}

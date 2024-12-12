import type { NextPage } from 'next';
import { Layout } from '@/app/_views/_layouts/Layout';
import { Head } from '@/app/_views/_widgets/Head';
import { About } from '@/app/_views/pages/useful/About';

const AboutPage: NextPage = ({}) => {
  const seo = {
    title: 'О нас - CamVision',
    description:
      'Узнайте больше о CamVision, платформе для наблюдения за видео в реальном времени на любых устройствах.',
  };

  return (
    <Layout seo={seo}>
      <Head title="О системе" />
      <About />
    </Layout>
  );
};

export default AboutPage;

import type { NextPage } from 'next';
import { Layout } from '@/app/_views/_layouts/Layout';
import { Head } from '@/app/_views/_widgets/Head';
import { Contacts } from '@/app/_views/pages/useful/Contacts';

const ContactPage: NextPage = ({}) => {
  const seo = {
    title: 'Контакты',
    description:
      'Свяжитесь с отделом ОСТК через контактную информацию CamVision для получения дополнительной поддержки или ответов на ваши вопросы.',
  };

  return (
    <Layout seo={seo}>
      <Head title={'Контакты'} />
      <Contacts />
    </Layout>
  );
};

export default ContactPage;

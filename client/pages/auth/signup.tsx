import type { NextPage } from 'next';
import { Layout } from '@/app/_views/_layouts/Layout';
import { SignUp } from '@/app/_views/pages/auth/SignUp';
import { Head } from '@/app/_views/_widgets/Head';

interface SignUpProps {}

const SignUpPage: NextPage<SignUpProps> = ({}) => {
  const seo = {
    title: 'Создание пользователя',
    description: '',
  };

  return (
    <Layout seo={seo}>
      <Head title={'Создание пользователя'} />
      <SignUp />
    </Layout>
  );
};

export default SignUpPage;

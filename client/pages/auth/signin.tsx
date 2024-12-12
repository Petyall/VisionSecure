import type { NextPage } from 'next';
import { Layout } from '@/app/_views/_layouts/Layout';
import { SignIn } from '@/app/_views/pages/auth/SignIn';

const SignInPage: NextPage = ({}) => {
  const seo = {
    title: 'Авторизация',
    description:
      'Вход в систему TCSD VisionSecure, ДГТУ начинается на этой стартовой странице.',
  };

  return (
    <Layout seo={seo}>
      <SignIn />
    </Layout>
  );
};

export default SignInPage;

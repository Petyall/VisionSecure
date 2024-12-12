import type { NextPage } from 'next';
import { useUserStore } from '@/app/_data/store';
import { _tabs } from '@/app/_data/static';
import { UserRole } from '@/app/_data/types/enums';
import { Layout } from '@/app/_views/_layouts/Layout';
import { Head } from '@/app/_views/_widgets/Head';
import { Root } from '@/app/_views/pages/dashboard/Root';
import { Admin } from '@/app/_views/pages/dashboard/Admin';
import { User } from '@/app/_views/pages/dashboard/User';
import { NoAccess } from '@/app/_views/pages/dashboard/NoAccess';

const DashboardPage: NextPage = () => {
  const { user, isAuth } = useUserStore();

  const seo = {
    title: 'CamVision',
    description:
      'CamVision предоставляет интуитивно понятный интерфейс для наблюдения за видео в реальном времени.',
  };

  if (!isAuth) {
    return <NoAccess />;
  }

  const userRole = user?.role;

  const pagesByRole = {
    [UserRole.ROOT]: <Root tabs={_tabs.root} />,
    [UserRole.ADMIN]: <Admin tabs={_tabs.admin} />,
    [UserRole.USER]: <User tabs={_tabs.user} />,
  };

  const page = pagesByRole[userRole as UserRole] || <NoAccess />;

  return (
    <Layout seo={seo}>
      <Head title={'Панель Управления'} />
      {page}
    </Layout>
  );
};

export default DashboardPage;
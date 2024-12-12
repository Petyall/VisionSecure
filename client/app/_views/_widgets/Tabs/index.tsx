import { FC } from 'react';
import { useRouter } from 'next/router';

import { Tab as _ITab } from '@/app/_data/types';

import { Flex } from '../../_layouts/Flex';

import cls from './index.module.scss';

interface TabsProps {
  tabs: _ITab[];
  currentTab: string;
}

const Tabs: FC<TabsProps> = ({ tabs, currentTab }) => {
  const router = useRouter();

  const handleTabClick = (slug: string) => {
    router.push(`/dashboard/${slug}`);
  };

  return (
    <nav className={cls.tabs}>
      <Flex gap="2px">
        {tabs.map((item, idx) => (
          <button
            key={idx}
            type="button"
            className={
              currentTab === item.slug ? `${cls.tab} ${cls.active}` : cls.tab
            }
            onClick={() => handleTabClick(item.slug)}
          >
            <span>{item.name}</span>
          </button>
        ))}
      </Flex>
    </nav>
  );
};

export { Tabs };

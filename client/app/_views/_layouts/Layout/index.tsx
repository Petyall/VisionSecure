import { FC, ReactNode } from 'react';
import Meta from '../../seo/Meta';

import { SEO } from '@/app/_data/types';
import { useModalWindowStore } from '@/app/_data/store';

import { Header } from '../../_widgets/Header';
import { Aside } from '../../_widgets/Aside';
import { Footer } from '../../_widgets/Footer';
import { Offcanvas } from '../../_widgets/Offcanvas';
import { Alert } from '../../_ui/popups/Alert';

import { EditUserModal } from '@/app/_views/components/modals/EditUserModal';
import { DeleteUserModal } from '@/app/_views/components/modals/DeleteUserModal';
import { EditCameraModal } from '@/app/_views/components/modals/EditCameraModal';
import { DeleteCameraModal } from '@/app/_views/components/modals/DeleteCameraModal';

import cls from './index.module.scss';


interface LayoutProps {
  children: ReactNode;
  seo: SEO;
}

/**
 * Добавьте модальных окон приложения
 * Ключ в формате '<type>_<entity>': Component
 */
const modalComponents: Record<string, FC<{ onClose: () => void }>> = {
  'edit_user': EditUserModal,
  'delete_user': DeleteUserModal,
  'edit_camera': EditCameraModal,
  'delete_camera': DeleteCameraModal,
};

const Layout: FC<LayoutProps> = ({ children, seo }) => {
  const { isShow, modalType, entityType, closeModal } = useModalWindowStore();

  const modalKey = modalType && entityType ? `${modalType}_${entityType}` : null;
  const ModalComponent = modalKey ? modalComponents[modalKey] : null;

  return (
    <Meta seo={seo}>
      <div className={cls.layout}>
        <Header />
        <Aside />
        <main>
          {children}
          <Footer />
        </main>
      </div>
      <Offcanvas />
      <Alert />
      {ModalComponent && (
        <ModalComponent onClose={closeModal} />
      )}
    </Meta>
  );
};

export { Layout };
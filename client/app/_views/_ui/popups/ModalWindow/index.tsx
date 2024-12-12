import { FC, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModalWindowStore } from "@/app/_data/store";
import { CloseIcon } from "../../svg_dynamic";
import { Title } from "../../typography/Title";
import { Flex } from "@/app/_views/_layouts/Flex";
import cls from "./index.module.scss";

interface ModalWindowProps {
  children: ReactNode;
  className?: string;
}

interface ModalHeadProps {
  title: string;
  ico?: ReactNode;
}

type ModalChildren = {
  children: ReactNode;
};

const ModalHead: FC<ModalHeadProps> = ({ title, ico }) => {
  return (
    <div className={cls.modalHead}>
      <Flex>
        {ico && ico}
        <Title type="h4">{title}</Title>
      </Flex>
    </div>
  );
};

const ModalBody: FC<ModalChildren> = ({ children }) => {
  return <div className={cls.modalBody}>{children}</div>;
};

const ModalFooter: FC<ModalChildren> = ({ children }) => {
  return <div className={cls.modalFooter}>{children}</div>;
};

const ModalWindow: FC<ModalWindowProps> & {
  Head: typeof ModalHead;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
} = ({ children, className }) => {
  const { isShow, closeModal } = useModalWindowStore();

  const handleFadeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          className={cls.fade}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleFadeClick}
        >
          <motion.section
            className={`${cls.modalWindow} ${className}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              title="Закрыть модальное окно"
              className={cls.close}
              onClick={closeModal}
            >
              <CloseIcon />
            </button>
            {children}
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

ModalWindow.Head = ModalHead;
ModalWindow.Body = ModalBody;
ModalWindow.Footer = ModalFooter;

export { ModalWindow };
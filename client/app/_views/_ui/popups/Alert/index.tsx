import { motion, AnimatePresence } from 'framer-motion';
import { useAlertStore } from '@/app/_data/store';
import { CloseIcon, InfoIcon } from '../../svg_dynamic';
import cls from './index.module.scss';

const Alert: React.FC = () => {
  const { alerts, removeAlert } = useAlertStore();

  return (
    <div className={cls.alertWrapper}>
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.15 }}
            className={`${cls.alert} ${cls[alert.type]}`}
          >
            <InfoIcon />
            <p>{alert.message}</p>
            <button onClick={() => removeAlert(alert.id)}>
              <CloseIcon />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export { Alert };

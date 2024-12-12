import { create } from 'zustand';

interface Alert {
  id: number;
  message: string;
  type: 'error' | 'warning' | 'info';
}

interface AlertState {
  alerts: Alert[];
  addAlert: (message: string, type: 'error' | 'warning' | 'info') => void;
  removeAlert: (id: number) => void;
}

let alertId = 0;

export const useAlertStore = create<AlertState>((set) => ({
  alerts: [],
  addAlert: (message: string, type: 'error' | 'warning' | 'info') =>
    set((state) => {
      if (state.alerts.length >= 10) {
        return { alerts: state.alerts };
      }

      const newAlert: Alert = { id: ++alertId, message, type };
      const updatedAlerts = [...state.alerts, newAlert];

      setTimeout(() => {
        set((state) => ({
          alerts: state.alerts.filter((alert) => alert.id !== newAlert.id),
        }));
      }, alertId * 1000);

      return { alerts: updatedAlerts };
    }),
  removeAlert: (id: number) =>
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    })),
}));

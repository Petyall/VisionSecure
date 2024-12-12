import { create } from 'zustand';

type ModalType = 'edit' | 'delete' | 'create' | null;
type EntityType = 'user' | 'camera' | null; 

interface ModalWindowStore {
    isShow: boolean;
    modalType: ModalType;
    entityType: EntityType;
    openModal: (type: ModalType, entity: EntityType) => void;
    closeModal: () => void;
}

export const useModalWindowStore = create<ModalWindowStore>((set) => ({
    isShow: false,
    modalType: null,
    entityType: null,
    openModal: (type, entity) => set({ isShow: true, modalType: type, entityType: entity }),
    closeModal: () => set({ isShow: false, modalType: null, entityType: null }), // Закрывает и очищает
}));

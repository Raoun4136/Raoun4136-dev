import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IStore {
  menu_modal: boolean;
  setMenuModal: (value: boolean) => void;
}

export const useStore = create<IStore>()(
  devtools((set) => ({
    menu_modal: false,
    setMenuModal: (value) => set((state) => ({ menu_modal: value })),
  }))
);

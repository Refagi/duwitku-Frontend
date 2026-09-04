import { create } from "zustand";

export type ModalType =
  | "add-transaction"
  | "edit-transaction"
  | "add-account"
  | "edit-account"
  | "add-category"
  | "edit-category"
  | "add-transfer"
  | "edit-transfer"
  | "confirm-delete"
  | "add-savings"
  | "edit-savings"
  | "deposit-savings"
  | "withdraw-savings" 
  | null;


interface UIState {
  activeModal: ModalType;
  modalPayload: unknown;
  isSidebarOpen: boolean;

  openModal: (modal: ModalType, payload?: unknown) => void;
  closeModal: () => void;
  toggleSidebar: () => void;
  closeSidebar: () => void
}

export const useUIStore = create<UIState>((set) => ({
  activeModal: null,
  modalPayload: undefined,
  isSidebarOpen: false,

  openModal: (modal, payload) => set({ activeModal: modal, modalPayload: payload }),
  closeModal: () => set({ activeModal: null, modalPayload: undefined }),
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
}));
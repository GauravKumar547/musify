import { create } from "zustand";
interface AuthModalStore {
    isOpen: boolean;
    signup: boolean;
    onOpen: (signup: boolean) => void;
    onClose: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
    isOpen: false,
    signup: true,
    onOpen: (signup) => set({ isOpen: true, signup: signup }),
    onClose: () => set({ isOpen: false, signup: true }),
}));
export default useAuthModal;

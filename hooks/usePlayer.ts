import { create } from "zustand";

interface PlayerStore {
    ids: string[];
    activeStop: any;
    activeId?: string;
    setId: (id: string) => void;
    setIds: (ids: string[]) => void;
    reset: () => void;
    setActiveStop: (stop: any) => void;
}
const usePlayer = create<PlayerStore>((set) => ({
    ids: [],
    activeStop: undefined,
    activeId: undefined,
    setId: (id: string) => set({ activeId: id }),
    setIds: (ids: string[]) => set({ ids: ids }),
    reset: () => set({ ids: [], activeId: undefined }),
    setActiveStop: (stop: any) => set({ activeStop: stop }),
}));

export default usePlayer;

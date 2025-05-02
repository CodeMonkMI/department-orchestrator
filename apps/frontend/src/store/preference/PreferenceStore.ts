import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type SidebarStates = {
  isOpen: boolean;
};

type States = {
  sidebar: SidebarStates;
};

type SideBarActions = {
  toggleSidebar: () => void;
};

type Actions = {
  sidebar: SideBarActions;
};

type CombineState = States & {
  actions: Actions;
};

const preferenceStore = create<CombineState>()(
  immer((set) => ({
    sidebar: {
      isOpen: true,
    },
    actions: {
      sidebar: {
        toggleSidebar: () => {
          set((state) => {
            state.sidebar.isOpen = !state.sidebar.isOpen;
          });
        },
      },
    },
  }))
);

export const useIsSidebarOpen = () =>
  preferenceStore((state) => state.sidebar.isOpen);
export const useSidebarActions = () =>
  preferenceStore((state) => state.actions.sidebar);

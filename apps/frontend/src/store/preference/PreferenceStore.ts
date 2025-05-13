import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SidebarStates = {
  isOpen: boolean;
};

type States = {
  sidebar: SidebarStates;
};

type SideBarActions = {
  toggleSidebar: () => void;
};

type Actions = SideBarActions;

type CombineState = States & {
  actions: Actions;
};

const preferenceStore = create<CombineState>()(
  persist(
    (set) => ({
      sidebar: {
        isOpen: true,
      },
      actions: {
        toggleSidebar: () => {
          set((state) => {
            return {
              ...state,
              sidebar: {
                ...state.sidebar,
                isOpen: !state.sidebar.isOpen
              }
            }
          });
        },

      },
    }),
    {
      name: "preference",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ sidebar: state.sidebar }),
    }
  )
);

export const useIsSidebarOpen = () =>
  preferenceStore((state) => state.sidebar.isOpen);
export const usePrefActions = () =>
  preferenceStore((state) => state.actions);

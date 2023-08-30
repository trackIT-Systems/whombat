// Global store for the application
import { useEffect, useState } from "react";
import { create } from "zustand";
import { createSessionSlice, type SessionSlice } from "./session";
import { createClipboardSlice, type ClipboardSlice } from "./clipboard";
import { persist, createJSONStorage } from "zustand/middleware";

type Store = SessionSlice & ClipboardSlice;

const useStore = create<Store>()(
  persist(
    (...a) => ({
      ...createSessionSlice(...a),
      ...createClipboardSlice(...a),
    }),
    {
      name: "whombat-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

const useHydration = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubHydrate = useStore.persist.onHydrate(() => setHydrated(false));

    const unsubFinishHydration = useStore.persist.onFinishHydration(() =>
      setHydrated(true),
    );

    setHydrated(useStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};

export default useStore;
export { useHydration };
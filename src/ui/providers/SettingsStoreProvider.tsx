import React from "react";
import { createStore, StoreApi, useStore } from "zustand";
import SettingRepositoryRemote from "../../data/repositories/setting/SettingRepositoryRemote";
import {
  createSettingsStore,
  SettingsStore,
} from "../../data/stores/SettingsStore";
import UserPreferencesService from "../../data/services/UserPreferencesService";

type BearStoreProviderProps = {
  children: React.ReactNode;
};

//type CreateSettingsStore = (settingRepo: SettingRepositoryRemote) => StoreApi<SettingsStore>
export const SettingsStoreContext =
  React.createContext<StoreApi<SettingsStore> | null>(null);

export const SettingsStoreProvider = ({ children }: BearStoreProviderProps) => {
  const userPreferencesService = UserPreferencesService.shared;

  const [store] = React.useState(
    createSettingsStore(new SettingRepositoryRemote(userPreferencesService))
  );

  return (
    <SettingsStoreContext.Provider value={store}>
      {children}
    </SettingsStoreContext.Provider>
  );
};


// export const useSettingsStore = <U>(selector: (state: SettingsStore) => U) => {
//   const store = React.useContext(SettingsStoreContext)
//   if (!store) {
//     throw new Error('useSettingsStore must be used within a SettingsStoreProvider')
//   }
//   return useStore(store, selector)
// }

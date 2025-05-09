import React from "react";
import {  StoreApi } from "zustand";
import SettingRepositoryRemote from "../../data/repositories/setting/SettingRepositoryRemote";
import {
  createSettingsStore,
  SettingsStore,
} from "../../data/stores/SettingsStore";
import UserPreferencesService from "../../data/services/UserPreferencesService";

type BearStoreProviderProps = {
  children: React.ReactNode;
};

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


 

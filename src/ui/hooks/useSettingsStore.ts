import { useStore } from "zustand";
import SettingRepositoryRemote from "../../data/repositories/setting/SettingRepositoryRemote";
import UserPreferencesService from "../../data/services/UserPreferencesService";
import { createSettingsStore, SettingsStore } from "../../data/stores/SettingsStore";
import { SettingsStoreContext } from "../providers/SettingsStoreProvider";
import React from "react";

// export const useSettingsStore = <U>(selector: (state: SettingsStore) => U) => {
//     const userPreferencesService = UserPreferencesService.shared;
//     return useStore(
//       createSettingsStore(new SettingRepositoryRemote(userPreferencesService)),
//       selector
//     );
//   };

export const useSettingsStore = <U>(selector: (state: SettingsStore) => U) => {
  const store = React.useContext(SettingsStoreContext);
  if (!store) {
    throw new Error("useSettingsStore must be used within a SettingsStoreProvider");
  }
  return useStore(store, selector);
};
import { useStore } from "zustand";
import SettingRepositoryRemote from "../../data/repositories/setting/SettingRepositoryRemote";
import UserPreferencesService from "../../data/services/UserPreferencesService";
import { createSettingsStore, SettingsStore } from "../../data/stores/SettingsStore";

export const useSettingsStore = <U>(selector: (state: SettingsStore) => U) => {
    const userPreferencesService = UserPreferencesService.shared;
    return useStore(
      createSettingsStore(new SettingRepositoryRemote(userPreferencesService)),
      selector
    );
  };
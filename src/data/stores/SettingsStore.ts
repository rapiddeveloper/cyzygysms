/*
Abstact: A zustand store to manage the settings of the app.
The settings are stored as user preferences in  sqlite and can be updated by the user.
*/

import { AppSetting, AppSettingKind } from "../domain/models/AppSettings";
import { EnrollmentStatus } from "../domain/models/StudentProfile";
import { CYZYGYSMSTheme } from "../@types/CYZYGYSMSTheme";
import { darkTheme, lightTheme } from "../../ui/theme/theme";
import SettingRepositoryRemote from "../repositories/setting/SettingRepositoryRemote";
//import { createStore } from "zustand";
import { createStore } from "zustand/vanilla";

export interface SettingsStore {
  settings: AppSetting[];
  currentTheme: () => CYZYGYSMSTheme;
  initalizeSettings: () => void;
  /**
   * Update the setting value based on the kind provided
   * @param kind Setting kind to update
   * @param value New value to set for the specified setting
   * @returns void
   */
  updateValue: (kind: AppSettingKind, value: string) => void;
}

const defaultSettings = [
  {
    kind: AppSettingKind.APPEARANCE,
    title: AppSettingKind.APPEARANCE,
    description: "Choose your light or dark theme preference",
    values: ["light", "dark"],
    selected: "light",
  },
  {
    kind: AppSettingKind.ENROLLMENTFILTER,
    title: AppSettingKind.ENROLLMENTFILTER,
    description: "Choose an enrollment status to filter the student list",
    values: Object.values(EnrollmentStatus),
    selected: EnrollmentStatus.ENROLLED,
  },
];

export const createSettingsStore = (settingRepo: SettingRepositoryRemote) =>
  createStore<SettingsStore>()((set, get) => ({
    settings: defaultSettings,
    currentTheme: (): CYZYGYSMSTheme => {
      const appearanceSetting = get().settings.find(
        (setting) => setting.kind === AppSettingKind.APPEARANCE
      );
      return appearanceSetting?.selected === "light" ? lightTheme : darkTheme;
    },
    initalizeSettings: () => {
      const savedAppearance = settingRepo.getSetting(AppSettingKind.APPEARANCE);
      const savedEnrollmentFilter = settingRepo.getSetting(
        AppSettingKind.ENROLLMENTFILTER
      );

      get().updateValue(AppSettingKind.APPEARANCE, savedAppearance || "light");
      get().updateValue(
        AppSettingKind.ENROLLMENTFILTER,
        savedEnrollmentFilter || EnrollmentStatus.ENROLLED
      );
    },

    updateValue: (kind: AppSettingKind, value: string) => {
      const isSuccess = settingRepo.updateSetting(kind, value);
      if (!isSuccess) {
        console.error("Failed to update setting");
        return;
      }

      const settingsToUpdate = [...get().settings];
      const settingIdx = settingsToUpdate.findIndex(
        (setting) => setting.kind === kind
      );
      if (settingIdx === -1) {
        return;
      }
      settingsToUpdate[settingIdx].selected = value;
      set({ settings: settingsToUpdate });
    },
  }));

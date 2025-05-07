import { create, useStore } from "zustand";
import { AppSetting, AppSettingKind } from "../domain/models/AppSettings";
import { EnrollmentStatus } from "../domain/models/Student";
import App from "../../../App";
import { CYZYGYSMSTheme } from "../@types/CYZYGYSMSTheme";
import { darkTheme, lightTheme } from "../../ui/theme/theme";
import { useCYZYGYSMSTheme } from "../../ui/providers/ThemeProvider";
 
 
export interface SettingsStore {     
    settings: AppSetting[];  
    currentTheme: ()=>CYZYGYSMSTheme
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
      values: ["light", "dark", "system"],
      selected: "light",
    },
    {
      kind: AppSettingKind.ENROLLMENTFILTER,
      title: AppSettingKind.ENROLLMENTFILTER,
      description: "Choose an enrollment status to filter the student list",
      values: Object.values(EnrollmentStatus),
      selected: EnrollmentStatus.ENROLLED,
    },
  ]

const createSettingsStore = create<SettingsStore>((set, get) => ({
    settings: defaultSettings,
    currentTheme: (): CYZYGYSMSTheme => {
         const appearanceSetting = get().settings.find((setting)=> setting.kind === AppSettingKind.APPEARANCE)
         return appearanceSetting?.selected === 'light' ? lightTheme : darkTheme
    },
    updateValue: (kind: AppSettingKind, value: string) => {
       
        set((state)=>({
            settings: state.settings.map((setting)=> setting.kind === kind ? {...setting, selected: value} : setting)
        }))

    }
}))

export const useSettingsStore = <U>(selector: (state: SettingsStore)=>U) => {
    return useStore(createSettingsStore, selector);
 }
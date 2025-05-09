import { useEffect } from 'react';
import { AppSettingKind } from '../../data/domain/models/AppSettings';
import { CYZYGYSMSTheme } from '../../data/@types/CYZYGYSMSTheme';
import { useSettingsStore } from './useSettingsStore';
import { createSettingsStore, SettingsStore } from '../../data/stores/SettingsStore';
import { useStore } from 'zustand';

interface UseSettingsTheme {
  theme: CYZYGYSMSTheme;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export const useSettingsTheme = (): UseSettingsTheme => {
  const currentTheme = useSettingsStore(state => state.currentTheme());
  const updateValue = useSettingsStore(state => state.updateValue);
  const currentSetting = useSettingsStore(state => 
    state.settings.find(setting => setting.kind === AppSettingKind.APPEARANCE)
  );

  const isDarkMode = currentSetting?.selected === 'dark';

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    updateValue(AppSettingKind.APPEARANCE, newTheme);
  };

  /*
  useEffect(() => {
    // Initialize settings when the hook is first used
    useSettingsStore.getState().initalizeSettings();
  }, []);*/

  return {
    theme: currentTheme,
    toggleTheme,
    isDarkMode
  };
     //useStore(createSettingsStore((store)=>), selector)
};
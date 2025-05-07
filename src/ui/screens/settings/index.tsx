import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SettingsView from './Settings.view'
import { AppSettingKind } from '../../../data/domain/models/AppSettings';
import { useSettingsStore } from '../../../data/stores/SettingsStore';
import { useShallow } from 'zustand/shallow';
import { SheetManager } from 'react-native-actions-sheet';
 
const Settings = () => {

   const {settings} = useSettingsStore(useShallow(store =>({
      updateValue: store.updateValue,
      settings: store.settings
     })))
     
  const handleSelect = (kind: AppSettingKind) => {
     SheetManager.show('settings-bottom-sheet', {payload: {settingKind: kind}})
  };
  return (
    <SettingsView onHandleSelect={handleSelect} settings={settings} />
  )
}

export default Settings

const styles = StyleSheet.create({})
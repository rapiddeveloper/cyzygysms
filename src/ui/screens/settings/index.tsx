import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import SettingsView from './Settings.view'
import { AppSettingKind } from '../../../data/domain/models/AppSettings';
 import { useShallow } from 'zustand/shallow';
import { SheetManager } from 'react-native-actions-sheet';
import { useSettingsStore } from '../../hooks/useSettingsStore';
 
const Settings = () => {

   const {settings, initialize} = useSettingsStore(useShallow(store =>({
      updateValue: store.updateValue,
      settings: store.settings,
      initialize: store.initalizeSettings
     })))
     
  const handleSelect = (kind: AppSettingKind) => {
     SheetManager.show('settings-bottom-sheet', {payload: {settingKind: kind}})
  };

  useEffect(()=>{
       initialize();
  },[])
  return (
    <SettingsView onHandleSelect={handleSelect} settings={settings} />
  )
}

export default Settings

const styles = StyleSheet.create({})
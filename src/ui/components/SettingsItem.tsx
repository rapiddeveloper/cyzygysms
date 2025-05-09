import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack } from '@grapp/stacks'
import { AppSetting, AppSettingKind } from '../../data/domain/models/AppSettings';
import { useSettingsTheme } from '../hooks/useSettingsTheme';

type SettingsProps = {
  setting: AppSetting
    onSelect: (kind: AppSettingKind) => void
 }

const SettingsItem = (props: SettingsProps) => {
    
 const { theme } = useSettingsTheme();
   const { typography, colors } = theme;
   const { setting, onSelect } = props;

  return (
    <TouchableOpacity onPress={() => onSelect(setting.kind)}>
     <Stack horizontal space={4}>
        <Stack space={2}>
          <Text numberOfLines={1} style={[typography.subtitle1, styles.capitalize, {color: colors.onBackground}]}>
            {setting.title}
          </Text>
          <Text numberOfLines={1} style={[typography.caption, {opacity: 0.74, color: colors.onBackground}]}>
            {setting.description}
          </Text>
          
        </Stack>
        {/* <IconButton name="more-vert"  color="black" style={[styles.iconButton]} /> */}
      </Stack>
    </TouchableOpacity>
   
  )
}

export default SettingsItem

const styles = StyleSheet.create({
  capitalize: {    
    textTransform: "capitalize",
  }
})
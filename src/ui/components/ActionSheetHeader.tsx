import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Bleed } from '@grapp/stacks'
import { Divider } from './Divider'
import { useSettingsTheme } from '../hooks/useSettingsTheme'

type ActionSheetHeaderProps = {     
    title: string
}

const ActionSheetHeader = (props: ActionSheetHeaderProps) => {
  const { title } = props;

  const {theme} = useSettingsTheme()
  return (
    <View>
       <Text style={[theme.typography.h6Headline, {textTransform: 'capitalize', color: theme.colors.onBackground}]}>{title}</Text>
       <Bleed horizontal={4}>
       <Divider  />
       </Bleed>
    </View>
  )
}

export default ActionSheetHeader

const styles = StyleSheet.create({})
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'
import ActionSheet from 'react-native-actions-sheet'
import { Stack } from '@grapp/stacks'
import ActionSheetHeader from './ActionSheetHeader'
import { IconButton } from './IconButton'
import { Student } from '../../data/domain/models/Student'
import { useSettingsTheme } from '../hooks/useSettingsTheme'
import ActionSheetContentContainer from './ActionSheetContentContainer'

type StudentProfileActionSheetProps = {
  onDeleteProfile: () => void;
  onEditProfile: () => void;
 }

const StudentProfileActionSheet = (props: StudentProfileActionSheetProps) => {

     const {theme} = useSettingsTheme()
    
    const labelStyle: StyleProp<TextStyle> = [theme.typography.subtitle1, {textTransform: 'capitalize', color: theme.colors.onBackground}]
    console.log('StudentProfileActionSheet', props)
  return (
    <ActionSheet >
       <ActionSheetContentContainer>
           {/* <ActionSheetHeader title='' /> */}
            <Pressable onPress={() => props.onDeleteProfile()}>
                 <Stack horizontal align={'center'} space={4}>
                    {/* <IconButton name='delete-outline'  /> */}
                    <Text style={labelStyle}>Delete Profile</Text>
                 </Stack>
            </Pressable>
            <Pressable onPress={() => props.onEditProfile()}>
                 <Stack horizontal align={'center'} space={4}>
                    <IconButton name='edit'  />
                    <Text style={labelStyle}>Edit Profile</Text>
                 </Stack>
            </Pressable>
        </ActionSheetContentContainer>
    </ActionSheet>
  )
}

export default StudentProfileActionSheet

const styles = StyleSheet.create({})
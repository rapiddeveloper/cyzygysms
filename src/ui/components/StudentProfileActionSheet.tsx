import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import React, { useCallback } from "react";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { Stack } from "@grapp/stacks";
import ActionSheetHeader from "./ActionSheetHeader";
import { IconButton } from "./IconButton";
import { StudentProfile } from "../../data/domain/models/StudentProfile";
import { useSettingsTheme } from "../hooks/useSettingsTheme";
import ActionSheetContentContainer from "./ActionSheetContentContainer";

const StudentProfileActionSheet = (
  props: SheetProps<"student-profile-sheet">
) => {
  const { theme } = useSettingsTheme();
  const { payload } = props;

  const labelStyle: StyleProp<TextStyle> = [
    theme.typography.subtitle1,
    { textTransform: "capitalize", color: theme.colors.onBackground },
  ];
  // console.log('StudentProfileActionSheet props', props)

  if (payload === undefined) {
    return null;
  }

  return (
    <ActionSheet>
      <ActionSheetContentContainer>
        <Pressable
          onPress={() => {
            payload.onDeleteProfile();
          }}
        >
          <Stack horizontal align={"center"} space={4}>
            <IconButton name="delete-outline" />
            <Text style={labelStyle}>Delete Profile</Text>
          </Stack>
        </Pressable>
        <Pressable onPress={() => payload.onEditProfile()}>
          <Stack horizontal align={"center"} space={4}>
            <IconButton name="edit" />
            <Text style={labelStyle}>Edit Profile</Text>
          </Stack>
        </Pressable>
      </ActionSheetContentContainer>
    </ActionSheet>
  );
};

export default StudentProfileActionSheet;

const styles = StyleSheet.create({});

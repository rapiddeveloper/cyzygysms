import { StyleSheet, Text } from "react-native";
import React from "react";
import { StudentProfile } from "../../data/domain/models/StudentProfile";
import { Box, Stack } from "@grapp/stacks";
 import { Image } from "expo-image";
 
import { IconButton } from "./IconButton";
import { useSettingsStore } from "../hooks/useSettingsStore";
import { constants } from "../../data/utilites/constants";

/**
 *
 * @returns {JSX.Element}
 * @description This component is used to display a list item for a student.
 * @param {StudentProps} student - The student data to display.
 */

type StudentProps = {
  student: StudentProfile;
  /**
   * @description This function is called when the user taps more actions icon on the student.
   * @param {StudentProfile} student - The student data to perform the action on.
   */
  onPerformAction?: (student: StudentProfile) => void;
};

const StudentListItem = (props: StudentProps) => {
  const { student, onPerformAction } = props;
    const {typography, colors} = useSettingsStore((store) => store).currentTheme();
  

  return (
    <Stack horizontal space={4} style={{backgroundColor: colors.surface, paddingVertical: constants.actionSheetHorizontalPadding}}>
      <Box>
        <Image source={{ uri: student.photoURL }} style={styles.avatar} />
      </Box>
      <Stack space={1}>
        <Text numberOfLines={1} style={[typography.subtitle1, {color: colors.onSurface}]}>
          {student.fullname}
        </Text>
        <Text numberOfLines={1} style={[typography.caption, {color: colors.onSurface}]}>
          {student.email}
        </Text>
        <Text style={[typography.subtitle2, styles.enrollmentStatus, {color: colors.onSurface}]}>
          {student.enrollmentStatus}
        </Text>
      </Stack>
      <IconButton
        name="more-vert"
        color={colors.onSurface}
        style={[styles.iconButton]}
        onPress={() => onPerformAction?.(student)}
      />
    </Stack>
  );
};

export default StudentListItem;

const styles = StyleSheet.create({
  iconButton: { marginInlineStart: "auto" },
  enrollmentStatus: {
    textTransform: "capitalize",
  },
  avatar: {
    width: 50,
    aspectRatio: 1,
    objectFit: "cover",
    borderRadius: 50,
  },
});

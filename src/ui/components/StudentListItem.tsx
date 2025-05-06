import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Student } from "../../data/domain/models/Student";
import { Box, Stack } from "@grapp/stacks";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useCYZYGYSMSTheme } from "../providers/ThemeProvider";
import { Divider } from "./Divider";
import { IconButton } from "./IconButton";

/**
 *
 * @returns {JSX.Element}
 * @description This component is used to display a list item for a student.
 * @param {StudentProps} student - The student data to display.
 */

type StudentProps = {
  student: Student;
};

const StudentListItem = (props: StudentProps) => {
  const { student } = props;
  const { theme } = useCYZYGYSMSTheme();
  const { colors } = theme;
  const { typography } = theme;

  return (
    
      <Stack horizontal space={4}>
        <Box>
          <Image source={{ uri: student.photoURL }} style={styles.avatar} />
        </Box>
        <Stack space={1}>
          <Text numberOfLines={1} style={[typography.subtitle1]}>
            {student.fullname}
          </Text>
          <Text numberOfLines={1} style={[typography.caption]}>
            {student.email}
          </Text>
          <Text style={[typography.subtitle2, styles.enrollmentStatus]}>
            {student.enrollmentStatus}
          </Text>
        </Stack>
        <IconButton name="more-vert"  color="black" style={[styles.iconButton]} />
      </Stack>
      
  );
};

export default StudentListItem;

const styles = StyleSheet.create({
  iconButton: {marginInlineStart: 'auto'},
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

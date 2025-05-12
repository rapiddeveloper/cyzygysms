import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { StudentProfile } from "../../data/domain/models/StudentProfile";
import { Divider } from "./Divider";
import StudentListItem from "./StudentListItem";
import { constants } from "../../data/utilites/constants";
import { useSettingsStore } from "../hooks/useSettingsStore";

type StudentListProps = {
  profiles: StudentProfile[];
  onProfileSelect: (student: StudentProfile) => void;
};

export const StudentList = ({ profiles, onProfileSelect }: StudentListProps) => {

      const {colors} = useSettingsStore((store) => store).currentTheme();
  
  return (
    <FlatList
      contentContainerStyle={[styles.container, {backgroundColor: colors.background}]}
      ItemSeparatorComponent={() => <Divider style={styles.divider} />}
      data={profiles}
      renderItem={({ item }) => (
        <StudentListItem
          student={item}
          onPerformAction={onProfileSelect}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingInline: constants.containerPaddingInline,
    paddingBlock: constants.containerPaddingBlock
  },
  divider: {
    marginBlock: 0,
  },
});
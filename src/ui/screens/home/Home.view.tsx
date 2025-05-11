import React, { useId } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { previewStudentsData } from "../../../data/domain/models/StudentProfile";
import StudentListItem from "../../components/StudentListItem";
import { Divider } from "../../components/Divider";
 import { HomeViewProps } from "./Home.types";
import { constants } from "../../../data/utilites/constants";
  
export const HomeView = (props: HomeViewProps) => {

   

  if (props.profiles.length === 0) {
    return null
  }
  
  return (
    <FlatList
      contentContainerStyle={styles.container}
      ItemSeparatorComponent={() => <Divider style={styles.divider} />}
      data={props.profiles}
      //keyExtractor={(item) => item.studentId }
      renderItem={({ item }) => (
        <StudentListItem
          student={item}
          onPerformAction={props.onProfileSelect}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
   // flex: 1,
    paddingInline: constants.containerPaddingInline,
    paddingBlock: constants.containerPaddingBlock
  },
  divider: {
    marginBlock: 16,
  },
});

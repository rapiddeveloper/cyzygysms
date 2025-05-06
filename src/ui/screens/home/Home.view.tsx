import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { previewStudentsData } from "../../../data/domain/models/Student";
import StudentListItem from "../../components/StudentListItem";
import { Divider } from "../../components/Divider";
import LayoutContainer from "../../components/LayoutContainer";

export const HomeView: React.FC = () => {


  return (
    <LayoutContainer>
      <FlatList 
        ItemSeparatorComponent={() =>  <Divider style={styles.divider} />}
        data={previewStudentsData}
        keyExtractor={(item) => item.studentId}
        renderItem={({ item }) => (
          <StudentListItem student={item} />
        )}
      />
    </LayoutContainer>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  divider: {
    marginBlock: 16,
  }
});

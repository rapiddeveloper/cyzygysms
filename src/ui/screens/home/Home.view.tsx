import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { previewStudentsData } from "../../../data/domain/models/Student";
import StudentListItem from "../../components/StudentListItem";

export const HomeView: React.FC = () => {


  return (
    <FlatList 
      data={previewStudentsData}
      keyExtractor={(item) => item.studentId}
      renderItem={({ item }) => (
        <StudentListItem student={item} />
      )}
    />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import { HomeView } from "./Home.view";
import { Student } from "../../../data/domain/models/Student";
import StudentProfileActionSheet from "../../components/StudentProfileActionSheet";
import { SheetManager } from "react-native-actions-sheet";
import { set } from "react-hook-form";

const Home = () => {
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(
    null
  );

  const handleProfileSelect = (student: Student) => {
    console.log(student.studentId);
    setSelectedStudent(student);
  };
  const handleDeleteProfile = () => {
    console.log("Delete Profile");
    setSelectedStudent(null);
  };
  const handleEditProfile = () => {
    console.log("Edit Profile");
  };

  useEffect(() => {
    if (selectedStudent) {
      SheetManager.show("student-profile-sheet", {
        payload: {
          onDeleteProfile: handleDeleteProfile,
          onEditProfile: handleEditProfile,
        },
      });
    } else {
      SheetManager.hide("student-profile-sheet");
    }
  }, [selectedStudent?.studentId]);

  return (
    <View>
      <HomeView onProfileSelect={handleProfileSelect} />

      <StudentProfileActionSheet sheetId={"student-profile-sheet"} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});

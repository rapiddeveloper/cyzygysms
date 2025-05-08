import { StyleSheet, Text, View } from "react-native";
import React, { use, useEffect } from "react";
import { HomeView } from "./Home.view";
import { Student } from "../../../data/domain/models/Student";
import StudentProfileActionSheet from "../../components/StudentProfileActionSheet";
import { SheetManager } from "react-native-actions-sheet";

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
  useEffect(() => {
    if (selectedStudent) {
      SheetManager.show("student-profile-sheet");
    }
  }, [selectedStudent?.studentId]);

  return (
    <View>
      <HomeView onProfileSelect={handleProfileSelect} />
      <StudentProfileActionSheet
         onDeleteProfile={handleDeleteProfile}
        // onDeleteProfile={() => {
        //   console.log("Delete Profile");
        // }}
        onEditProfile={() => {
          console.log("Edit Profile");
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});

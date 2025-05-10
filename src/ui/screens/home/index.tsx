import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import { HomeView } from "./Home.view";
import { StudentProfile } from "../../../data/domain/models/StudentProfile";
import StudentProfileActionSheet from "../../components/StudentProfileActionSheet";
import { SheetManager } from "react-native-actions-sheet";
import { set } from "react-hook-form";
import { useStudentsProfilesStore } from "../../hooks/useStudentProfilesStore";
import { RequestStatus } from "../../../data/@types/Result";
import { useNavigation } from "@react-navigation/native";
import { MainTabViewScreenProps } from "../../../data/@types/Navigation";

const Home = () => {
  const navigation =
    useNavigation<MainTabViewScreenProps<"AddStudent">["navigation"]>();

  const [selectedStudent, setSelectedStudent] =
    React.useState<StudentProfile | null>(null);
  const { profiles } = useStudentsProfilesStore((store) => store);

  const handleProfileSelect = (student: StudentProfile) => {
    console.log(student.studentId);
    setSelectedStudent(student);
  };
  const handleDeleteProfile = () => {
    console.log("Delete Profile");
    setSelectedStudent(null);
  };
  const handleEditProfile = () => {
    console.log("Edit Profile");
    setSelectedStudent(null);
    navigation.navigate('AddStudent', {studentId: selectedStudent?.studentId})
  };

  const handleClose = () => {
    setSelectedStudent(null);
  };

  useEffect(() => {
    if (selectedStudent) {
      SheetManager.show("student-profile-sheet", {
        payload: {
          onDeleteProfile: handleDeleteProfile,
          onEditProfile: handleEditProfile,
          onClose: handleClose,
        },
      });
    } else {
      SheetManager.hide("student-profile-sheet");
    }
  }, [selectedStudent?.studentId]);

  return (
    <View>
      <HomeView profiles={profiles} onProfileSelect={handleProfileSelect} />
      {/* {postsStore.isLoadingPosts === RequestStatus.Loading &&
      postsStore.isEmpty() ? (
        <ActivityIndicator size={'large'} />
      ) : postsStore.isLoadingPosts === RequestStatus.Idle &&
        postsStore.isEmpty() ? (
        <Text>No Posts Available</Text>
      ) : (
        <Text>Failed To Get Posts</Text>
      )} */}
      <StudentProfileActionSheet sheetId={"student-profile-sheet"} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});

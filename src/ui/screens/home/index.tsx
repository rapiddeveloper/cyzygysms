import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-simple-toast";

import { HomeView } from "./Home.view";
import { EnrollmentStatus, StudentProfile } from "../../../data/domain/models/StudentProfile";
import StudentProfileActionSheet from "../../components/StudentProfileActionSheet";
import { SheetManager } from "react-native-actions-sheet";
import { useStudentsProfilesStore } from "../../hooks/useStudentProfilesStore";
import { MainTabViewScreenProps } from "../../../data/@types/Navigation";
import { useSettingsStore } from "../../hooks/useSettingsStore";
import { Stack } from "@grapp/stacks";
import { IconButton } from "../../components/IconButton";

const Home = () => {
  const navigation =
    useNavigation<MainTabViewScreenProps<"AddStudent">["navigation"]>();

  const [selectedStudent, setSelectedStudent] =
    React.useState<StudentProfile | null>(null);
  const { profiles, deleteProfile } = useStudentsProfilesStore(
    (store) => store
  );
  const {settings, currentTheme} = useSettingsStore((store) => store)
  const theme = currentTheme()

  const preferredEnrolment = (()=>{
    return settings[1].selected
  })()

  const handleProfileSelect = (student: StudentProfile) => {
     setSelectedStudent(student);
  };
  const handleDeleteProfile = () => {
     if (selectedStudent === null) {
      return;
    }
    try {
      setSelectedStudent(null);
      deleteProfile(selectedStudent.studentId);
      Toast.showWithGravity(
        `profile deleted successfully`,
        Toast.LONG,
        Toast.BOTTOM
      );
    } catch (error) {}
  };
  const handleEditProfile = () => {
    setSelectedStudent(null);
    navigation.navigate("AddStudent", {
      studentId: selectedStudent?.studentId,
    });
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
    <View style={{backgroundColor: theme.colors.background,  flex: 1}}>
      <HomeView profiles={profiles.filter(profile => preferredEnrolment === EnrollmentStatus.NONE ? true : profile.enrollmentStatus === preferredEnrolment)} onProfileSelect={handleProfileSelect} />
      {profiles.length === 0 && (
        <Stack
          space={1}
          align={"center"}
          height={"100%"}
          style={{ justifyContent: "center" }}
        >
          <Text style={theme.typography.h6Headline}>
            No Student Profile Available.
          </Text>
          
          <Stack align={'center'} horizontal style={[theme.typography.body2]}>
            <Text>Tap the</Text>
            <IconButton size={30} name="add-circle-outline" />
            <Text>button to create a student profile</Text>
          </Stack>
        </Stack>
      )}

      <StudentProfileActionSheet sheetId={"student-profile-sheet"} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});

import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-simple-toast";

import { HomeView } from "./Home.view";
import { StudentProfile } from "../../../data/domain/models/StudentProfile";
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
  const theme = useSettingsStore((store) => store).currentTheme();

  const handleProfileSelect = (student: StudentProfile) => {
    console.log(student.studentId);
    setSelectedStudent(student);
  };
  const handleDeleteProfile = () => {
    console.log("Delete Profile");
    if (selectedStudent === null) {
      return;
    }
    try {
      setSelectedStudent(null);
      deleteProfile(selectedStudent.studentId);
      Toast.showWithGravity(
        `profile deleted successfull`,
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
    <View>
      <HomeView profiles={profiles} onProfileSelect={handleProfileSelect} />
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

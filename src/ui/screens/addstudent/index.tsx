import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AddStudentView } from "./AddStudent.view";
import { useShallow } from "zustand/shallow";
import useStudentProfileFormStore from "../../hooks/useStudentProfileFormStore";
import { StudentProfileFormData } from "../../../data/domain/models/StudentProfile";
import { useStudentsProfilesStore } from "../../hooks/useStudentProfilesStore";

const AddStudent = () => {

  const { addProfile } = useStudentsProfilesStore((store) => store);
  const studentProfileFormStore = useStudentProfileFormStore(
    useShallow((state) => ({
      createProfile: state.createStudentProfile,
    }))
  );

  const handlePhotoUpload = async (selectedPhotoFileURL: string) => {
    console.log("Selected photo file URL: ", selectedPhotoFileURL);
  };

  const handleSubmit = async (submittedData: StudentProfileFormData) => {
     try {
      const createdProfile = await studentProfileFormStore.createProfile(
        submittedData
      );
      addProfile(createdProfile);
    } catch (error) {
      // show notification error
     // console.error(error.message);
    }
  };

  return (
    <AddStudentView
      onSubmit={(submittedData) => handleSubmit(submittedData)}
      onPhotoUpload={(selectedPhotoFileURL) =>
        handlePhotoUpload(selectedPhotoFileURL)
      }
    />
  );
};

export default AddStudent;

const styles = StyleSheet.create({});

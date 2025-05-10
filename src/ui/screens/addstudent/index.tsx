/**
 * Abstract:
 * This file contains the AddStudent component, which is responsible for rendering the
 * Add Student screen in the application. It uses the AddStudentView component to display
 * the form for adding a new student. The component also handles the submission of the
 * form and the uploading of the student's photo.
 */

import { Modal, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AddStudentView } from "./AddStudent.view";
import useStudentProfileFormStore from "../../hooks/useStudentProfileFormStore";
import {
  StudentProfile,
  StudentProfileFormData,
} from "../../../data/domain/models/StudentProfile";
import { useStudentsProfilesStore } from "../../hooks/useStudentProfilesStore";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MainTabViewScreenProps } from "../../../data/@types/Navigation";
import { RequestStatus } from "../../../data/@types/Result";
import { emptyFormData } from "../../../data/utilites/constants";

const AddStudent = () => {
  const [profileToEdit, setProfileToEdit] =
    useState<StudentProfileFormData>(emptyFormData);
  const navigation =
    useNavigation<MainTabViewScreenProps<"Home">["navigation"]>();
  const route = useRoute<MainTabViewScreenProps<"AddStudent">["route"]>();
  const { studentId } = route.params;
  const { addProfile, getProfile, replaceProfile } = useStudentsProfilesStore((store) => store);
  const {
    createStudentProfile: createProfile,
    createProfileStatus,
    updateProfile,
  } = useStudentProfileFormStore((store) => store);

  const isNew = (()=> studentId === undefined)()

  const handlePhotoUpload = async (selectedPhotoFileURL: string) => {
    console.log("Selected photo file URL: ", selectedPhotoFileURL);
  };

  const handleSubmit = async (submittedData: StudentProfileFormData) => {
    try {
      if (isNew) {
        const createdProfile = await createProfile(submittedData);
        addProfile(createdProfile);
       } else {
        const updatedProfile = await updateProfile(submittedData, studentId!);
        replaceProfile(updatedProfile);
      }
      navigation.navigate("Home");

    } catch (error) {
      // show notification error
      // console.error(error.message);
    }
  };

  useEffect(() => {
    if (studentId === undefined) {
      return;
    }
    let profile = getProfile(studentId);
    if (profile === null) {
      return;
    }
    const formData: StudentProfileFormData = {
      file: { uri: profile.photoURL, name: emptyFormData.file.name, type: emptyFormData.file.type },
      name: profile.fullname,
      email: profile.email,
      enrollmentStatus: profile.enrollmentStatus,
    };
    setProfileToEdit(formData);
  }, []);

 
  return (
    <Modal>
      <AddStudentView
        isNew={isNew}
        draft={profileToEdit}
        isSubmitting={createProfileStatus === RequestStatus.Loading}
        onClose={() => navigation.goBack()}
        onSubmit={(submittedData) => handleSubmit(submittedData)}
        onPhotoUpload={(selectedPhotoFileURL) =>
          handlePhotoUpload(selectedPhotoFileURL)
        }
      />
    </Modal>
  );
};

export default AddStudent;

const styles = StyleSheet.create({});

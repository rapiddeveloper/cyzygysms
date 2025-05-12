/**
 * Abstract:
 * This file contains the AddStudent component, which is responsible for rendering the
 * Add Student screen in the application. It uses the AddStudentView component to display
 * the form for adding a new student. The component also handles the submission of the
 * form and the uploading of the student's photo.
 */

import {  Alert, Modal, StyleSheet, Text, View } from "react-native";
import React, {  useState } from "react";
import Toast from "react-native-simple-toast";
import { AddStudentView } from "./AddStudent.view";
import useStudentProfileFormStore from "../../hooks/useStudentProfileFormStore";
import {
  StudentProfile,
  StudentProfileFormData,
} from "../../../data/domain/models/StudentProfile";
import { useStudentsProfilesStore } from "../../hooks/useStudentProfilesStore";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { MainTabViewScreenProps } from "../../../data/@types/Navigation";
import { RequestStatus } from "../../../data/@types/Result";
import { emptyFormData } from "../../../data/utilites/constants";

const AddStudent = () => {
  const [profileToEdit, setProfileToEdit] =
    useState<StudentProfileFormData>(emptyFormData);
  const navigation =
    useNavigation<MainTabViewScreenProps<"Home">["navigation"]>();
    const settingsNavigation =
    useNavigation<MainTabViewScreenProps<'Settings'>["navigation"]>();
  const createProfileNavigation =
    useNavigation<MainTabViewScreenProps<"AddStudent">["navigation"]>();
  const route = useRoute<MainTabViewScreenProps<"AddStudent">["route"]>();
  // const studentId = route.params?.studentId
  const { addProfile, getProfile, replaceProfile } = useStudentsProfilesStore(
    (store) => store
  );
  const {
    createStudentProfile: createProfile,
    createProfileStatus,
    updateProfile,
  } = useStudentProfileFormStore((store) => store);
  const [studentId, setStudentId] = useState<string>("");
  const [resetFormTaskId, setResetFormTaskId] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);

  const isNew = (() => studentId === "")();

  const handlePhotoUpload = async (selectedPhotoFileURL: string) => {
    console.log("Selected photo file URL: ", selectedPhotoFileURL);
  };

  const handleClose = () => {
     setModalVisible(false)
     setStudentId("")
    setProfileToEdit(emptyFormData)
    createProfileNavigation.navigate('AddStudent', {studentId: undefined})
    settingsNavigation.navigate('Settings')
    navigation.navigate("Home");
  };

  const handleSubmit = async (submittedData: StudentProfileFormData) => {
    try {
      if (isNew) {
        const createdProfile = await createProfile(submittedData);
        if (createdProfile !== null) {
          addProfile(createdProfile);
          Toast.showWithGravity(
            `Profile created successfully`,
            Toast.LONG,
            Toast.BOTTOM
          );
        }
      } else {
        const updatedProfile = await updateProfile(submittedData, studentId!);
        if (updatedProfile !== null) {
          replaceProfile(updatedProfile);
          Toast.showWithGravity(
            `Profile updated successfully`,
            Toast.LONG,
            Toast.BOTTOM
          );
        }
      }
      //setProfileToEdit(null)
      handleClose();
    } catch (error) {
      // show notification error
      // console.error(error.message);
    }
  };

  

  useFocusEffect(
    React.useCallback(() => {
      //console.log(" params studentId", route.params?.studentId);
      setStudentId(route.params?.studentId || "");
    }, [route.params?.studentId])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (studentId === "") {
        return;
      }
       let profile = getProfile(studentId);
       if (profile === null) {
        return;
      }
      const formData: StudentProfileFormData = {
        file: {
          uri: profile.photoURL,
          name: emptyFormData.file.name,
          type: emptyFormData.file.type,
        },
        name: profile.fullname,
        email: profile.email,
        enrollmentStatus: profile.enrollmentStatus,
      };
      setProfileToEdit(formData);
     
    }, [studentId])

   
  );

  useFocusEffect(
    React.useCallback(()=>{
      setModalVisible(true)
      
    }, [])
  )

  

  return (
     <Modal   animationType="slide"
     transparent={true}
     visible={modalVisible}
     onRequestClose={() => {
       
       setModalVisible(!modalVisible);
     }}>
      <AddStudentView
         isNew={isNew}
        draft={profileToEdit}
        isSubmitting={createProfileStatus === RequestStatus.Loading}
        onClose={() => handleClose()}
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

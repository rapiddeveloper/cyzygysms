import { Box, Stack } from "@grapp/stacks";
import { Button } from "@react-navigation/elements";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { TextField } from "../../components/TextField";
import { EnrollmentStatus, StudentProfileFormData } from "../../../data/domain/models/StudentProfile";
import StudentPhotoPicker from "../../components/StudentPhotoPicker";
import { ImagePickerAsset } from "expo-image-picker";
import { EnrollmentPicker } from "../../components/EnrollmentPicker";
import { useSettingsTheme } from "../../hooks/useSettingsTheme";
import LayoutContainer from "../../components/LayoutContainer";
import constants from "../../../data/utilites/constants";
import { useSettingsStore } from "../../hooks/useSettingsStore";
import { useShallow } from "zustand/shallow";
 

type AddStudentViewProps = {
  onPhotoUpload: (photo: string) => Promise<void>;
  onSubmit: (data: StudentProfileFormData) => void;
};

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const schema = yup
  .object({
    name: yup.string().required("First name is required"),
    email: yup
      .string()
      .matches(emailRegex, "Please enter a valid email")
      .required("Email is required"),
    enrollmentStatus: yup.string().required("Enrollment status is required"),
    file: yup.object({
      uri: yup
        .string()
        .required("Please select a photo")
        .test("is-valid-uri", "Invalid file URI", (value) =>
          value ? value.startsWith("http://") || value.startsWith("https://") || value.startsWith("file://") : false
        ),
      name: yup.string().required("File name is required"),
      type: yup.string().required("File type is required"),
    }).required(), // Ensure the file object is required
  })
  .required();

export const AddStudentView = (props: AddStudentViewProps) => {
  //const { theme } = useSettingsTheme();
  const settingsStore = useSettingsStore(
      useShallow((store) => ({
        updateValue: store.updateValue,
        settings: store.settings,
        currentTheme: store.currentTheme,
      }))
    );
  
    //   if (props.payload === undefined) {
    //     return null;
    //   }
  
    let theme = settingsStore.currentTheme();

  console.log('theme', theme)
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<StudentProfileFormData>({
    defaultValues: {
      name: "",
      email: "",
      enrollmentStatus: EnrollmentStatus.ENROLLED,
      file: undefined,
    },
    resolver: yupResolver(schema),
  });

 
  const onSubmit = (data: StudentProfileFormData) => {
    console.log("onSubmit", data);
    
    props.onSubmit(data);
  };

  const handleImageLoaded = async (
    asset: ImagePickerAsset,
    onChange: (value: string) => void
  ) => {
    await props.onPhotoUpload(asset.uri);
    setValue("file", {uri: asset.uri, name: asset.fileName || "", type: asset.mimeType || ""});
    // onChange(asset.uri);
  };

 
  return (
    <LayoutContainer scrolls={true}>
      <Stack space={4}>
        <Stack space={4} style={{ height: 200, alignItems: "center" }}>
          <Controller
            control={control}
            name="file"
            render={({ field: { onChange, value } }) => (
              <StudentPhotoPicker
                onImageLoaded={(asset) => handleImageLoaded(asset, onChange)}
                currUri={null}
              />
            )}
          />
          {errors.file && (
            <Text
              style={[
                styles.photoError,
                theme.typography.caption,
                { color: theme.colors.error },
              ]}
            >
              {errors.file.uri?.message}
            </Text>
          )}
        </Stack>
        <TextField
          label="First Name"
          name="name"
          control={control}
          rules={{ required: true }}
          error={errors.name}
        />
        <TextField
          label="Email"
          name="email"
          control={control}
          rules={{ required: true }}
          error={errors.email}
        />
        <EnrollmentPicker
          control={control}
          error={errors.enrollmentStatus?.message}
        />

        <TouchableOpacity
          style={[
            styles.button,
            theme.typography.button,
            {
              backgroundColor: theme.colors.primary700,
            },
          ]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={{ color: theme.colors.onPrimary }}>Submit</Text>
        </TouchableOpacity>
      </Stack>
    </LayoutContainer>
  );
};

const styles = StyleSheet.create({
  photoError: {
    fontSize: constants.formPhotoErrorFontSize,
    marginTop: constants.formPhotoErrorMarginTop,
    marginLeft: constants.formPhotoErrorMarginLeft,
  },
  label: {
    color: "black",
    marginLeft: constants.formLabelMarginLeft,
  },
  button: {
    marginTop: constants.formButtonMarginTop,
    height: constants.formButtonHeight,
    borderRadius: constants.formButtonBorderRadius,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: constants.containerPadding,
    backgroundColor: "#0e101c",
  },
  input: {
    backgroundColor: "white",
    borderColor: "none",
    height: constants.inputHeight,
    padding: constants.inputPadding,
    borderRadius: constants.inputBorderRadius,
  },
});

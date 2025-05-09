import { Box, Stack } from "@grapp/stacks";
import { Button } from "@react-navigation/elements";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { TextField } from "../../components/TextField";
import { EnrollmentStatus } from "../../../data/domain/models/Student";
import StudentPhotoPicker from "../../components/StudentPhotoPicker";
import { ImagePickerAsset } from "expo-image-picker";
import { EnrollmentPicker } from "../../components/EnrollmentPicker";
import { useSettingsTheme } from "../../hooks/useSettingsTheme";
import LayoutContainer from "../../components/LayoutContainer";

type StudentFormData = {
  firstName: string;
  email: string;
  enrollmentStatus: string;
  photoURL: string;
};

type AddStudentViewProps = {
  onPhotoUpload: (photo: string) => Promise<void>;
};

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    email: yup
      .string()
      .matches(emailRegex, "Please enter a valid email")
      .required("Email is required"),
    enrollmentStatus: yup.string().required("Enrollment status is required"),
    photoURL: yup.string().required("Please select a photo"),
  })
  .required();

export const AddStudentView = (props: AddStudentViewProps) => {
  const { theme } = useSettingsTheme();

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<StudentFormData>({
    defaultValues: {
      firstName: "",
      email: "",
      enrollmentStatus: EnrollmentStatus.ENROLLED,
      photoURL: "",
    },
    resolver: yupResolver(schema),
  });

  console.log("errors", errors);

  const onSubmit = (data: StudentFormData) => {
    console.log("onSubmit", data);
    console.log(data);
  };

  const handleImageLoaded = async (
    asset: ImagePickerAsset,
    onChange: (value: string) => void
  ) => {
    console.log("handleImageLoaded", asset);
    // await props.onPhotoUpload(asset.uri);
    setValue("photoURL", asset.uri);
    // onChange(asset.uri);
  };

  return (
    <LayoutContainer>
      <Stack space={4}>
        <Stack space={4} style={{ height: 200, alignItems: "center" }}>
          <Controller
            control={control}
            name="photoURL"
            render={({ field: { onChange, value } }) => (
              <StudentPhotoPicker
                onImageLoaded={(asset) => handleImageLoaded(asset, onChange)}
                currUri={null}
              />
            )}
          />
          {errors.photoURL && (
            <Text
              style={[
                styles.photoError,
                theme.typography.caption,
                { color: theme.colors.error },
              ]}
            >
              {errors.photoURL.message}
            </Text>
          )}
        </Stack>
        <TextField
          label="First Name"
          name="firstName"
          control={control}
          rules={{ required: true }}
          error={errors.firstName}
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
    fontSize: 12,
    marginTop: 4,
    marginLeft: 10,
  },
  label: {
    color: "black",
    marginLeft: 10,
  },
  button: {
    marginTop: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    // paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: "#0e101c",
  },
  input: {
    backgroundColor: "white",
    borderColor: "none",
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});

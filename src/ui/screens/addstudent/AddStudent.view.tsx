import { Box, Stack } from "@grapp/stacks";
import { Button } from "@react-navigation/elements";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Picker } from "@react-native-picker/picker";

import { TextField } from "../../components/TextField";
import { EnrollmentStatus } from "../../../data/domain/models/Student";
import StudentPhotoPicker from "../../components/StudentPhotoPicker";

type StudentFormData = {
  firstName: string;
  email: string;
  enrollmentStatus: string;
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
  })
  .required();

export const AddStudentView: React.FC = () => {
  const enrollmentStatuses = Object.values(EnrollmentStatus);

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
      enrollmentStatus: "",
    },
    resolver: yupResolver(schema),
  });

   
  console.log("errors", errors);

  const onSubmit = (data: StudentFormData) => {
    console.log("onSubmit", data);
    console.log(data);
  };

  return (
    <Stack space={4}>
       <Box style={{height: 200}}>
          <StudentPhotoPicker onImageLoaded={(asset) => console.log(asset)} currUri={null}  />
       </Box>
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
      <Stack space={0} style={{backgroundColor: 'red'}}>
        <Text style={styles.label}>Select Enrollment</Text>
        <Controller
          control={control}
          name="enrollmentStatus"
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              style={{ width: "100%", height: 'auto' }}
              mode={"dropdown"}
              onValueChange={(itemValue, itemIndex) => {
                onChange(itemValue);
              }}
            >
              {enrollmentStatuses.map((status) => (
                <Picker.Item
                  style={{ textTransform: "capitalize" }}
                  key={status}
                  label={
                    status.charAt(0).toUpperCase() +
                    status.slice(1).toLowerCase()
                  }
                  value={status}
                />
              ))}
            </Picker>
          )}
        />
      </Stack>

      {/* <Picker
          selectedValue={Enable}
          style={{ width: "100%" }}
          mode={'dropdown'}
          onValueChange={(itemValue) => setEnable(itemValue)}
        >
           
          <Picker.Item label="Courses" value="courses" />
          <Picker.Item label="Data-Structures" value="DSA" />
          <Picker.Item label="ReactJs" value="react" />
          <Picker.Item label="C++" value="cpp" />
          <Picker.Item label="Python" value="py" />
          <Picker.Item label="Java" value="java" />
        </Picker> */}

      <Stack style={styles.button}>
        <Button
          // style={styles.buttonInner}
          onPress={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "black",
    marginLeft: 10,
  },
  button: {
    marginTop: 40,
    color: "white",
    height: 40,
    backgroundColor: "#ec5990",
    borderRadius: 4,
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Control, Controller, FieldError } from 'react-hook-form';
import { Picker } from "@react-native-picker/picker";
import { Stack } from "@grapp/stacks";
import { EnrollmentStatus } from "../../data/domain/models/Student";
import { useSettingsTheme } from '../hooks/useSettingsTheme';


interface EnrollmentPickerProps {
    control: Control<any>;
    error?: string
  }
  
  export const EnrollmentPicker: React.FC<EnrollmentPickerProps> = ({ control, error }) => {
    const enrollmentStatuses = [...Object.values(EnrollmentStatus)];
    
  
    const { theme } = useSettingsTheme();

    return (
      <Stack space={0}>
        <Text style={styles.label}>Select Enrollment</Text>
        <Controller
          control={control}
          name="enrollmentStatus"
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value === "" ? "Select Enrollment" : value}
              style={styles.picker}
              mode={"dropdown"}
              onValueChange={onChange}
              
            >
              {enrollmentStatuses.map((status) => (
                <Picker.Item
                  style={[styles.pickerItem]}
                  key={status}
                  label={status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
                  value={status}
                />
              ))}
            </Picker>
          )}
        />
        {error && <Text style={[styles.error, { color: theme.colors.error }]}>{error}</Text>}
      </Stack>
    );
  };
  
  const styles = StyleSheet.create({
    label: {
      color: "black",
      marginLeft: 10,
    },
    picker: {
      width: "100%",
      height: 'auto',
      backgroundColor: "white",
    //   borderWidth: 1,
    //   borderColor: "black",
    //   borderRadius: 4,
    },
    pickerItem: {
      textTransform: "capitalize"
    },
    error: {
      fontSize: 12,
      marginTop: 4,
      marginLeft: 10
    }
  });
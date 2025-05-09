import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form';
import { Stack } from '@grapp/stacks';
import { useSettingsTheme } from '../hooks/useSettingsTheme';

interface TextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  rules?: object;
  error?: FieldError
}

export const TextField = <T extends FieldValues>({ 
  control, 
  name, 
  label, 
  rules = {}, 
  error 
}: TextFieldProps<T>) => {

  const {theme} = useSettingsTheme() 

  return (
    <Stack space={1}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name={name}
        rules={rules}
      />
      {error && <Text style={[styles.label, {color: theme.colors.error}]}>{error.message}</Text>}
    </Stack>
  );
};

const styles = StyleSheet.create({
  label: {
    color: 'black',
    marginLeft: 10,
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'none',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});
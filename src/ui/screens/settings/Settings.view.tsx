import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  AppSetting,
  AppSettingKind,
} from "../../../data/domain/models/AppSettings";
import SettingsItem from "../../components/SettingsItem";
import { Stack } from "@grapp/stacks";
import { Divider } from "../../components/Divider";
import { EnrollmentStatus } from "../../../data/domain/models/Student";

const settings: AppSetting[] = [
  {
    kind: AppSettingKind.APPEARANCE,
    title: AppSettingKind.APPEARANCE,
    description: "Choose your light or dark theme preference",
    values: ["light", "dark", "system"],
    selected: "light",
  },
  {
    kind: AppSettingKind.ENROLLMENTFILTER,
    title: AppSettingKind.ENROLLMENTFILTER,
    description: "Choose an enrollment status to filter the student list",
    values: Object.values(EnrollmentStatus),
    selected: EnrollmentStatus.ENROLLED,
  },
];


const SettingsView: React.FC = () => {
 
  const handleSelect = (kind: AppSettingKind) => {
    console.log(`Selected setting kind: ${kind}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack space={4} divider={<Divider  />}>
        {settings.map((setting) => (
          <SettingsItem
            key={setting.kind}
            setting={setting}
            onSelect={handleSelect}
          />
        ))}
      </Stack>
    </ScrollView>
  );
};

export default SettingsView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingInline: 20,
    paddingBlock: 32
  },
});

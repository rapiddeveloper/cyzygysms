import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import SettingsItem from "../../components/SettingsItem";
import { Stack } from "@grapp/stacks";
import { Divider } from "../../components/Divider";
import { EnrollmentStatus } from "../../../data/domain/models/StudentProfile";
import { SettingsViewProps } from "./Settings.types";

/**
 * the view for the settings screen
 * @param props - Props for the SettingsView component
 * @returns JSX.Element
 */

const SettingsView = (props: SettingsViewProps) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack space={4} divider={<Divider />}>
        {props.settings.map((setting) => (
          <SettingsItem
            key={setting.kind}
            setting={setting}
            onSelect={props.onHandleSelect}
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
    paddingBlock: 32,
  },
});

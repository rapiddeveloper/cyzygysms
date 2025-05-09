import React, { useId } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import SettingsItem from "../../components/SettingsItem";
import { Stack } from "@grapp/stacks";
import { Divider } from "../../components/Divider";
import { EnrollmentStatus } from "../../../data/domain/models/StudentProfile";
import { SettingsViewProps } from "./Settings.types";
import LayoutContainer from "../../components/LayoutContainer";

/**
 * the view for the settings screen
 * @param props - Props for the SettingsView component
 * @returns JSX.Element
 */

const SettingsView = (props: SettingsViewProps) => {
        const id = useId()
  
   return (
    <LayoutContainer scrolls>
      <Stack space={4}  divider={<Divider key={id}  />}>
        {props.settings.map((setting) => (
          <SettingsItem
            key={setting.kind}
            setting={setting}
            onSelect={props.onHandleSelect}
          />
        ))}
      </Stack>
    </LayoutContainer>
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

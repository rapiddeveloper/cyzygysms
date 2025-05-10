import { StyleSheet, Text, View } from "react-native";
import React, { use, useState } from "react";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { Bleed, Stack } from "@grapp/stacks";
import { AdvancedCheckbox } from "react-native-advanced-checkbox";
import { useShallow } from "zustand/shallow";
 import { Divider } from "./Divider";
import { useSettingsStore } from "../hooks/useSettingsStore";
import { constants } from "../../data/utilites/constants";

const SettingsBottomSheet = (props: SheetProps<"settings-bottom-sheet">) => {
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

  let setting = (() => {
    return settingsStore.settings.find(
      (setting) => setting.kind === props.payload?.settingKind
    );
  })();

  if (setting === undefined) {
    return null;
  }

  return (
    <ActionSheet>
      <Stack
        space={constants.actionSheetVerticalSpacing}
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text
          style={[
            theme.typography.h6Headline,
            { textTransform: "capitalize", color: theme.colors.onBackground },
          ]}
        >
          Choose {setting.title}
        </Text>
        <Bleed horizontal={4}>
          <Divider />
        </Bleed>
        {setting.values.map((option, index: number) => (
          <Stack
            key={index}
            horizontal
            align={"center"}
            space={4}
            style={styles.option}
          >
            <Text
              style={[
                theme.typography.subtitle1,
                {
                  textTransform: "capitalize",
                  color: theme.colors.onBackground,
                },
              ]}
            >
              {option}
            </Text>
            <AdvancedCheckbox
              value={option === setting.selected}
              onValueChange={(changedValue) => {
                settingsStore.updateValue(setting.kind, option);
                //setChecked(Boolean(changedValue));
              }}
              checkedColor={theme.colors.secondary700}
              uncheckedColor={theme.colors.outline}
              size={24}
            />
          </Stack>
        ))}
      </Stack>
    </ActionSheet>
  );
};

export default SettingsBottomSheet;

const styles = StyleSheet.create({
  container: {
    width: "auto",
    paddingInline: constants.actionSheetHorizontalPadding,
    paddingBlock: constants.actionSheetVerticalPadding,
  },
  option: { width: "40%", justifyContent: "space-between" },
});

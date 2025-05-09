import { StyleSheet, Text, View } from "react-native";
import React, { PropsWithChildren } from "react";
import constants from "../../data/utilites/constants";
import { Stack } from "@grapp/stacks";
import { useSettingsTheme } from "../hooks/useSettingsTheme";

type ActionSheetContainerProps = {} & PropsWithChildren;

const ActionSheetContentContainer = (props: ActionSheetContainerProps) => {
  const { theme } = useSettingsTheme();

  return (
    <Stack
      space={constants.actionSheetVerticalSpacing}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {props.children}
    </Stack>
  );
};

export default ActionSheetContentContainer;

const styles = StyleSheet.create({
  container: {
    width: "auto",
    paddingInline: constants.actionSheetHorizontalPadding,
    paddingBlock: constants.actionSheetVerticalPadding,
  },
});

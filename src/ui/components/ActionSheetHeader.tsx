import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { Bleed, Stack } from "@grapp/stacks";
import { Divider } from "./Divider";
import { useSettingsTheme } from "../hooks/useSettingsTheme";

type ActionSheetHeaderProps = {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  button?: () => React.ReactNode;
};

const ActionSheetHeader = (props: ActionSheetHeaderProps) => {
  const { title, button } = props;

  const { theme } = useSettingsTheme();
  return (
    <Stack
      divider={
        <Bleed horizontal={4}>
          <Divider />
        </Bleed>
      }
    >
      <Stack horizontal style={[props.containerStyle]}>
        <Text
          style={[
            theme.typography.h6Headline,
            { textTransform: "capitalize", color: theme.colors.onBackground },
          ]}
        >
          {title}
        </Text>
        {button?.()}
      </Stack>
    </Stack>
  );
};

export default ActionSheetHeader;

const styles = StyleSheet.create({});

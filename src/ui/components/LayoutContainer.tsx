import { ScrollView, StyleSheet } from "react-native";
import React, { PropsWithChildren } from "react";
import { Stack } from "@grapp/stacks";
 import { useSettingsStore } from "../hooks/useSettingsStore";
 
// This is a container component that will be used to wrap the layout of a screen

type LayoutContainerProps = {scrolls?: boolean} & PropsWithChildren;

const LayoutContainer = ({ scrolls = false, children }: LayoutContainerProps) => {

 // const { theme } = useSettingsStore((store) => ({ theme: store.currentTheme() }));
 const { currentTheme } = useSettingsStore((store) => store);

    //   if (props.payload === undefined) {
    //     return null;
    //   }
  
    const { colors } = currentTheme()
 
   if (!scrolls) {
    return (
      <Stack style={[styles.container, {backgroundColor: colors.background}]} space={4}>
        {children}
      </Stack>
    );
  }
  return (
    <ScrollView contentContainerStyle={[styles.container, {backgroundColor: colors.background}]}>
      {children}
    </ScrollView>
  );
};

export default LayoutContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBlock: 32,
    paddingInline: 20,
  },
});

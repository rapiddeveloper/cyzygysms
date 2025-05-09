import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { PropsWithChildren } from "react";
import { Stack } from "@grapp/stacks";

// This is a container component that will be used to wrap the layout of a screen

type LayoutContainerProps = {scrolls?: boolean} & PropsWithChildren;

const LayoutContainer = ({ scrolls = false, children }: LayoutContainerProps) => {
  if (!scrolls) {
    return (
      <Stack style={styles.container}>
        {children}
      </Stack>
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
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

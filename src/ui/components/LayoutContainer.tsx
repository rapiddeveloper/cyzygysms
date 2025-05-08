import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { PropsWithChildren } from "react";

// This is a container component that will be used to wrap the layout of a screen

type LayoutContainerProps = {} & PropsWithChildren;

const LayoutContainer = (props: LayoutContainerProps) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {props.children}
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

import React from "react";
import { StyleSheet, Text } from "react-native";

export const HomeView: React.FC = () => {
  return <Text style={[styles.container]}>Home</Text>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

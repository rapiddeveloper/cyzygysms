import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useCYZYGYSMSTheme } from '../providers/ThemeProvider';

type DividerProps = {
  vertical?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const Divider: React.FC<DividerProps> = ({ vertical = false, style }) => {
  const { theme } = useCYZYGYSMSTheme();

  return (
    <View
      style={[
        styles.divider,
        style,
        vertical ? styles.vertical : styles.horizontal,
        { backgroundColor: theme.colors.outline }
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    opacity: 0.12,
  },
  horizontal: {
    height: 1,
    width: '100%',
  },
  vertical: {
    width: 1,
    height: '100%',
  },
});
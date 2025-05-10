import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
 import { useSettingsStore } from '../hooks/useSettingsStore';

type IconButtonProps = {
  name: keyof typeof MaterialIcons.glyphMap;
  size?: number;
  color?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const IconButton: React.FC<IconButtonProps> = ({
  name,
  size = 24,
  color,
  onPress,
  style,
}) => {
   const  theme  = useSettingsStore((store) => store).currentTheme();
  

  return (
    <TouchableOpacity 
      style={[styles.iconButton, style]} 
      onPress={onPress}
    >
      <MaterialIcons 
        name={name} 
        size={size} 
        color={color || theme.colors.onSurface} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconButton: {
   },
});
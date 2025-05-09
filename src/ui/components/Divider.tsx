import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useCYZYGYSMSTheme } from '../providers/ThemeProvider';
import { useShallow } from 'zustand/shallow';
import { useSettingsStore } from '../hooks/useSettingsStore';
 
type DividerProps = {
  vertical?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const Divider: React.FC<DividerProps> = ({ vertical = false, style }) => {
 
      const settingsStore = useSettingsStore(useShallow(store =>({
     
      currentTheme: store.currentTheme
     })))
  
  //   if (props.payload === undefined) {
  //     return null;
  //   }
  
    let theme = settingsStore.currentTheme()

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
    opacity: 0.24,
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
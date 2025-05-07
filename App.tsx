import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabView from './src/ui/navigation/MainTabView';
import { CYZYGYSMSThemeProvider } from './src/ui/providers/ThemeProvider';
import {  SheetProvider } from 'react-native-actions-sheet';
import './src/ui/components/Sheet'

const RootStack = createNativeStackNavigator();

export default function App() {
const [fontsLoaded] = useFonts({
    'Raleway-Thin': require('./assets/fonts/Raleway-Thin.ttf'),
    'Raleway-ExtraLight': require('./assets/fonts/Raleway-ExtraLight.ttf'),
    'Raleway-Light': require('./assets/fonts/Raleway-Light.ttf'),
    'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
    'Raleway-Medium': require('./assets/fonts/Raleway-Medium.ttf'),
    'Raleway-SemiBold': require('./assets/fonts/Raleway-SemiBold.ttf'),
    'Raleway-Bold': require('./assets/fonts/Raleway-Bold.ttf'),
    'Raleway-ExtraBold': require('./assets/fonts/Raleway-ExtraBold.ttf'),
    'Raleway-Black': require('./assets/fonts/Raleway-Black.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (

    <CYZYGYSMSThemeProvider>
    <SheetProvider>
    <NavigationContainer>
      <SafeAreaProvider>
        <RootStack.Navigator screenOptions={{ headerShown: false, headerStyle: { backgroundColor: '#fff' } }}>
          <RootStack.Screen name="MainTabs" component={MainTabView} />
         </RootStack.Navigator>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </NavigationContainer>
    </SheetProvider>
    </CYZYGYSMSThemeProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

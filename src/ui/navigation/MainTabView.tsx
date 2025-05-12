import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import IonIcons from "@expo/vector-icons/Ionicons";

import Home from "../screens/home";
import AddStudent from "../screens/addstudent";
import Settings from "../screens/settings";
import { MainTabViewParamList } from "../../data/@types/Navigation";

import { useSettingsStore } from "../hooks/useSettingsStore";
import { StudentsProfilesStoreProvider } from "../providers/StudentsProfilesStoreProvider";
import { StudentProfileFormStoreProvider } from "../providers/StudentProfileFormStoreProvider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const TabView = createBottomTabNavigator<MainTabViewParamList>();

type TabBarIconProps = {
  color: string;
  size: number;
  focused: boolean;
};

const tabBarIcon = (
  key: keyof MainTabViewParamList,
  props: TabBarIconProps
) => {
  switch (key) {
    case "Home":
      return props.focused ? (
        <MaterialIcons name="home-filled" {...props} />
      ) : (
        <MaterialIcons style={{ opacity: 0.7 }} name="home" {...props} />
      );
    case "AddStudent":
      return (
        <MaterialIcons
          style={{ opacity: 0.7 }}
          name="add-circle-outline"
          {...props}
        />
      );
    case "Settings":
      return props.focused ? (
        <IonIcons name="settings-sharp" {...props} />
      ) : (
        <IonIcons style={{ opacity: 0.7 }} name="settings-outline" {...props} />
      );
    default:
      return <MaterialIcons name="home" {...props} />;
  }
};

const AddStudentWithProvider = () => (
  <StudentProfileFormStoreProvider>
    <AddStudent />
  </StudentProfileFormStoreProvider>
);

const Stack = createNativeStackNavigator();

const CreateProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'formSheet',
        headerStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen name="CreateProfile" component={AddStudentWithProvider} />
    </Stack.Navigator>
  );
};

export default function MainTabView() {
  const theme = useSettingsStore((store) => store).currentTheme();

  return (
    <StudentsProfilesStoreProvider>
      <TabView.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary800,
          },
          headerTintColor: theme.colors.onPrimary, // White color for header text
          tabBarStyle: {
            backgroundColor: theme.colors.primary700, // Using the secondary700 red color from your theme
          },
          tabBarActiveTintColor: theme.colors.onPrimary, // White color for active tab
          tabBarInactiveTintColor: theme.colors.onPrimary, // Slightly transparent white for inactive tabs
        }}
      >
        <TabView.Screen
          options={{
            tabBarIcon: (props) => tabBarIcon("Home", props),
          }}
          name="Home"
          component={Home}
        />
        <TabView.Screen
          initialParams={{ studentId: "" }}
          options={{
            headerTitle: 'Create Profile',
            animation: "shift",
            tabBarIcon: (props) =>
              tabBarIcon("AddStudent", { ...props, size: 30 }),
            tabBarLabel: "",
          }}
          name="AddStudent"
          component={AddStudentWithProvider}
        />

        <TabView.Screen
          options={{
            tabBarIcon: (props) => tabBarIcon("Settings", props),
          }}
          name="Settings"
          component={Settings}
        />
      </TabView.Navigator>
    </StudentsProfilesStoreProvider>
  );
}

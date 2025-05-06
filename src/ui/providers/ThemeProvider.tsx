import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
 import { Appearance, useColorScheme } from "react-native";
import { CYZYGYSMSTheme } from "../../data/@types/CYZYGYSMSTheme";
import { darkTheme, lightTheme } from "../theme/theme";
 
type YoutubeThemeProviderProps = {
  children: ReactNode;
};

interface ThemeObj {
  theme: CYZYGYSMSTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeObj | undefined>(undefined);

export const CYZYGYSMSThemeProvider = ({
  children
 
}: YoutubeThemeProviderProps) => {
  const colorScheme = useColorScheme();
  
  const [theme, setTheme] = useState<CYZYGYSMSTheme>(
    colorScheme === "dark" ? darkTheme : lightTheme
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
       setTheme(colorScheme === "dark" ? darkTheme : lightTheme);
    });

    return () => subscription.remove();
  }, []);

  const toggleTheme = () => {
    Appearance.setColorScheme(theme === darkTheme ? "light" : "dark");
  };

  const themeObj: ThemeObj = {
    theme,
    toggleTheme,
  };
  return (
    <ThemeContext.Provider value={themeObj}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useCYZYGYSMSTheme = (): ThemeObj => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useCYZYGYSMSTheme must be used within a YoutubeThemeProvider"
    );
  }
  return context;
};

import { StyleProp, TextStyle } from "react-native";

 
  
  export type Typography = {
    h1Headline:  StyleProp<TextStyle>;
    h2Headline:  StyleProp<TextStyle>;
    h3Headline:  StyleProp<TextStyle>;
    h4Headline:  StyleProp<TextStyle>;
    h5Headline:  StyleProp<TextStyle>;
    h6Headline:  StyleProp<TextStyle>;
    subtitle1:  StyleProp<TextStyle>;
    subtitle2:  StyleProp<TextStyle>;
    body1:  StyleProp<TextStyle>;
    body2:  StyleProp<TextStyle>;
    button:  StyleProp<TextStyle>  ;
    caption:  StyleProp<TextStyle>;
    overline:  StyleProp<TextStyle>  
  };
  
  type ThemeColors = {
    primary700: string;
    primary800: string;
    primary900: string;
    secondary700: string;
    onPrimary: string;
    onSecondary: string;
    background: string;
    onBackground: string;
    surface: string;
    onSurface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;
    outline: string;
    error: string;
    onError: string;
  };
  
  type Elevation = {
    level0: string;
    level1: string;
    level2: string;
  };
  
  export type CYZYGYSMSTheme = {
    dark: boolean;
    colors: ThemeColors;
    typography: Typography;
    elevation: Elevation;
  };
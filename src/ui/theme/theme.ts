import { CYZYGYSMSTheme, Typography } from "../../data/@types/CYZYGYSMSTheme";

const typography: Typography = {
    h1Headline: { fontFamily: 'Raleway-Light', fontSize: 96 },
    h2Headline: { fontFamily: 'Raleway-Regular', fontSize: 60 },
    h3Headline: { fontFamily: 'Raleway-SemiBold', fontSize: 48 },
    h4Headline: { fontFamily: 'Raleway-SemiBold', fontSize: 34 },
    h5Headline: { fontFamily: 'Raleway-SemiBold', fontSize: 24 },
    h6Headline: { fontFamily: 'Raleway-SemiBold', fontSize: 20 },
    subtitle1: { fontFamily: 'Raleway-Medium', fontSize: 16 },
    subtitle2: { fontFamily: 'Raleway-SemiBold', fontSize: 14 },
    body1: { fontFamily: 'Raleway-SemiBold', fontSize: 16 },
    body2: { fontFamily: 'Raleway-Regular', fontSize: 14 },
    button: { fontFamily: 'Raleway-SemiBold', fontSize: 14, textTransform: 'uppercase' },
    caption: { fontFamily: 'Raleway-Medium', fontSize: 12 },
    overline: { fontFamily: 'Raleway-SemiBold', fontSize: 12, textTransform: 'uppercase' }
};

  export const lightTheme: CYZYGYSMSTheme = {
    dark: false,
    colors: {
      primary700: '#720D5D',
      primary800: '#5D1049',
      primary900: '#4E0D3A',
      secondary700: '#E30425',
      onPrimary: '#FFFFFF',
      onSecondary: '#FFFFFF',    // White for contrast
      background: '#FFFFFF',     // White background
      onBackground: '#000000',   // Black for contrast
       surface: '#FFFFFF',        // White surface
       onSurface: '#000000',      // Black for contrast
    surfaceVariant: '#F5F5F5', // Light gray variant
    onSurfaceVariant: '#1C1B1F', // Dark gray for contrast
    outline: '#79747E',        // Medium gray for outlines
    error: '#B3261E',         // Standard error red
    onError: '#FFFFFF', 
    },
    typography,
    elevation: {
      level0: 'transparent',
      level1: '#F5F5F5',
      level2: '#E0E0E0',
    },
  };

  export const darkTheme = {
    dark: true,
    colors: {
      primary700: '#720D5D',
      primary800: '#5D1049',
      primary900: '#4E0D3A',
      secondary700: '#E30425',
      onPrimary: '#FFFFFF',
      onSecondary: '#FFFFFF',    // White for contrast
      background: '#FFFFFF',     // White background
      onBackground: '#000000',   // Black for contrast
       surface: '#FFFFFF',        // White surface
       onSurface: '#000000',      // Black for contrast
    surfaceVariant: '#F5F5F5', // Light gray variant
    onSurfaceVariant: '#1C1B1F', // Dark gray for contrast
    outline: '#79747E',        // Medium gray for outlines
    error: '#B3261E',         // Standard error red
    onError: '#FFFFFF', 
    },
    typography,
    elevation: {
      level0: 'transparent',
      level1: '#F5F5F5',
      level2: '#E0E0E0',
    },
  };
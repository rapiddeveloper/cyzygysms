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
        primary700: '#FF8AD4',     // Lighter version of #720D5D for dark theme
        primary800: '#DB76B5',     // Lighter version of #5D1049
        primary900: '#B35F96',     // Lighter version of #4E0D3A
        secondary700: '#FF4D6E',   // Lighter version of #E30425
        onPrimary: '#000000',      // Black text on light primary colors
        onSecondary: '#000000',    // Black text on light secondary colors
        background: '#121212',     // Dark background
        onBackground: '#FFFFFF',   // White text on dark background
        surface: '#1E1E1E',       // Dark surface
        onSurface: '#FFFFFF',     // White text on dark surface
        surfaceVariant: '#2C2C2C', // Dark gray variant
        onSurfaceVariant: '#E6E1E5', // Light gray for contrast
        outline: '#938F99',       // Lighter gray for outlines in dark mode
        error: '#FFB4AB',        // Lighter error color for dark theme
        onError: '#690005',
    },
    typography,
    elevation: {
      level0: 'transparent',
      level1: '#F5F5F5',
      level2: '#E0E0E0',
    },
  };
import React from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    body1Bold: React.CSSProperties;
    tableHeader: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    body1Bold?: React.CSSProperties;
    tableHeader?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body1Bold: true;
    tableHeader: true;
  }
}

declare module '@mui/material/styles/createTypography' {
  interface FontStyle {
    fontFamilyAzeretMono: React.CSSProperties['fontFamily'];
    fontFamilyJakarta: React.CSSProperties['fontFamily'];
  }
}

declare module '@mui/system/createTheme/createBreakpoints' {
  interface BreakpointOverrides {
    lg: true;
    md: true;
    sm: true;
    xl: true;
    xs: true;
    xxl: true;
  }
}

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    alert: {
      error: {
        background: string;
        content: string;
      };
      info: {
        background: string;
        content: string;
      };
      success: {
        background: string;
        content: string;
      };
      warning: {
        background: string;
        content: string;
      };
    };
    neutral: {
      100: string;
      200: string;
      300: string;
      400: string;
      50: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    success: PaletteColor;
    warning: PaletteColor;
  }

  interface PaletteColor {
    darkest?: string;
    hovered?: string;
    lightest?: string;
  }

  interface SimplePaletteColorOptions {
    darkest?: string;
    hovered?: string;
    lightest?: string;
  }

  interface PaletteOptions {
    alert: {
      error: {
        background: string;
        content: string;
      };
      info: {
        background: string;
        content: string;
      };
      success: {
        background: string;
        content: string;
      };
      warning: {
        background: string;
        content: string;
      };
    };
    neutral: {
      100: string;
      200: string;
      300: string;
      400: string;
      50: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
  }

  interface TypeBackground {
    default: string;
    paper: string;
    paperGlass: string;
    paperTertiary: string;
  }
}

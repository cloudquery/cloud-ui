import { PaletteColor } from '@mui/material/styles/createPalette';

import { ColorRange } from './types';

/**
 * Neutral colors for Material-UI theme
 *
 * @public
 */
export const neutral: ColorRange = {
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D2D6DB',
  400: '#9DA4AE',
  50: '#F8F9FA',
  500: '#6C737F',
  600: '#4D5761',
  700: '#2F3746',
  800: '#1C2536',
  900: '#111927',
};

/**
 * Primary colors for Material-UI theme
 *
 * @public
 */
export const primary: PaletteColor = {
  contrastText: '#FFFFFF',
  dark: '#087443',
  darkest: '#084C2E',
  light: '#EDFCF2',
  lightest: '#F6FEF9',
  main: '#16B364',
};

/**
 * Secondary colors for Material-UI theme
 *
 * @public
 */
export const secondary: PaletteColor = {
  contrastText: '#FFFFFF',
  dark: '#2F3746',
  darkest: '#111927',
  light: '#EAEFF5',
  lightest: '#F8FAFC',
  main: '#6C737F',
};

/**
 * Error colors for Material-UI theme
 *
 * @public
 */
export const error: PaletteColor = {
  contrastText: '#FFFFFF',
  dark: '#B42318',
  darkest: '#7A271A',
  light: '#FEE4E2',
  lightest: '#FEF3F2',
  main: '#F04438',
};

/**
 * Warning colors for Material-UI theme
 *
 * @public
 */
export const warning: PaletteColor = {
  contrastText: '#FFFFFF',
  dark: '#B54708',
  darkest: '#7A2E0E',
  light: '#FEF0C7',
  lightest: '#FFFAEB',
  main: '#F79009',
};

/**
 * Info colors for Material-UI theme
 *
 * @public
 */
export const info: PaletteColor = {
  contrastText: '#FFFFFF',
  dark: '#0E7090',
  darkest: '#164C63',
  light: '#CFF9FE',
  lightest: '#ECFDFF',
  main: '#06AED4',
};

/**
 * Success colors for Material-UI theme
 *
 * @public
 */
export const success: PaletteColor = {
  contrastText: '#FFFFFF',
  dark: '#107569',
  darkest: '#134E48',
  light: '#CCFBEF',
  lightest: '#F0FDF9',
  main: '#15B79E',
};

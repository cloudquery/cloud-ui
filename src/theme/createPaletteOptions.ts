import { common } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import { PaletteOptions } from '@mui/material/styles/createPalette';

import { error, info, neutral, success, warning, primary, secondary } from './colors';

/**
 * Creates and returns palette options for a Material-UI theme.
 *
 * @returns The palette options for the theme, including colors for actions, alerts, background, text, and various UI elements.
 *
 * @public
 */
export const createThemePaletteOptions = () => {
  return {
    action: {
      active: neutral[500],
      disabled: alpha(neutral[100], 0.38),
      disabledBackground: alpha(neutral[100], 0.12),
      focus: alpha(neutral[100], 0.16),
      hover: alpha(neutral[100], 0.04),
      selected: alpha(neutral[100], 0.12),
    },
    alert: {
      error: {
        background: error.light,
        content: error.darkest as string,
      },
      info: {
        background: info.light,
        content: info.darkest as string,
      },
      success: {
        background: success.main,
        content: secondary.darkest,
      },
      warning: {
        background: '#FDEAD7',
        content: '#772917',
      },
    },
    background: {
      default: '#0E1320',
      paper: neutral[900],
      paperGlass: alpha(neutral[900], 0.9),
      paperTertiary: neutral[800],
    },
    common,
    divider: '#29303D',
    error,
    info,
    mode: 'dark' as PaletteOptions['mode'],
    neutral,
    primary: {
      ...primary,
      hovered: alpha('#16b364', 0.08),
    },
    secondary: {
      ...secondary,
      hovered: alpha('#6C737F', 0.08),
    },
    success,
    text: {
      disabled: alpha('#FFFFFF', 0.48),
      primary: '#EDF2F7',
      secondary: '#ACB1B9',
    },
    warning,
  };
};

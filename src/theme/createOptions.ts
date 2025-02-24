import { ThemeOptions } from '@mui/material/styles';

import { breakpoints } from './breakpoints';
import { createThemeComponents } from './createComponents';
import { createElevation } from './createElevation';
import { createThemePaletteOptions } from './createPaletteOptions';
import { createThemeShadows } from './createShadows';
import { createTypographyOptions } from './createTypographyOptions';

/**
 * Creates and returns theme options for a Material-UI theme.
 *
 * This function combines typography, palette, component, and shadow options
 * to create a cohesive theme configuration for Material-UI.
 *
 * @returns The theme options including breakpoints, shape, direction, typography, palette, components, shadows.
 *
 * @public
 */
export const createThemeOptions = (): ThemeOptions & {
  elevation: ReturnType<typeof createElevation>;
} => {
  const typographyOptions = createTypographyOptions();
  const paletteOptions = createThemePaletteOptions();
  const components = createThemeComponents({ paletteOptions, typographyOptions });
  const shadows = createThemeShadows();
  const elevation = createElevation();

  return {
    breakpoints: {
      values: breakpoints,
    },
    shape: {
      borderRadius: 8,
    },
    direction: 'ltr',
    components,
    palette: paletteOptions,
    shadows,
    typography: typographyOptions,
    elevation,
  };
};

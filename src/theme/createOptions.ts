import { ThemeOptions } from '@mui/material/styles';

import { createThemeComponents } from './createComponents';
import { createThemePaletteOptions } from './createPaletteOptions';
import { createThemeShadows } from './createShadows';
import { createTypographyOptions } from './createTypographyOptions';

/**
 * Creates and returns theme options for a Material-UI theme.
 *
 * This function combines typography, palette, component, and shadow options
 * to create a cohesive theme configuration for Material-UI.
 *
 * @returns The theme options including typography, palette, components, and shadows.
 *
 * @public
 */
export const createThemeOptions = (): ThemeOptions => {
  const typographyOptions = createTypographyOptions();
  const paletteOptions = createThemePaletteOptions();
  const components = createThemeComponents({ paletteOptions, typographyOptions });
  const shadows = createThemeShadows();

  return {
    components,
    palette: paletteOptions,
    shadows,
    typography: typographyOptions,
  };
};

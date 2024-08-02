import { BreakpointOverrides } from '@mui/system/createTheme/createBreakpoints';

/**
 * Breakpoints for Material-UI theme
 *
 * @public
 */
export const breakpoints: Record<keyof BreakpointOverrides, number> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1640,
};

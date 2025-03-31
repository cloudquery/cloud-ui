import { TypographyVariantsOptions } from '@mui/material/styles';

const fontFamilyAzeretMono = "'Azeret Mono', sans-serif";
const fontFamilyJakarta = "'Plus Jakarta Sans', sans-serif";

/**
 * Creates and returns typography options for a Material-UI theme.
 *
 * @returns The typography options for the theme, including font families, sizes, weights, and line heights for various text styles.
 *
 * @public
 */
export const createTypographyOptions = (): TypographyVariantsOptions => {
  return {
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body1Bold: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57,
    },
    body2Bold: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.57,
    },
    button: {
      fontWeight: 600,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.66,
    },
    fontFamily: "'Inter', sans-serif",
    fontFamilyAzeretMono,
    fontFamilyJakarta,
    h1: {
      fontFamily: fontFamilyJakarta,
      fontSize: '3.5rem',
      fontVariantLigatures: 'none',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: fontFamilyJakarta,
      fontSize: '3rem',
      fontVariantLigatures: 'none',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: fontFamilyJakarta,
      fontSize: '2.25rem',
      fontVariantLigatures: 'none',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h4: {
      fontFamily: fontFamilyJakarta,
      fontSize: '2rem',
      fontVariantLigatures: 'none',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h5: {
      fontFamily: fontFamilyJakarta,
      fontSize: '1.5rem',
      fontVariantLigatures: 'none',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h6: {
      fontFamily: fontFamilyJakarta,
      fontSize: '1.125rem',
      fontVariantLigatures: 'none',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: 2.5,
      textTransform: 'uppercase',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    tableHeader: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: 1,
      textTransform: 'uppercase',
    },
  };
};

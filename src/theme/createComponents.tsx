import { alertClasses } from '@mui/material/Alert';
import { backdropClasses } from '@mui/material/Backdrop';
import { buttonClasses } from '@mui/material/Button';
import { filledInputClasses } from '@mui/material/FilledInput';
import { formLabelClasses } from '@mui/material/FormLabel';
import { inputLabelClasses } from '@mui/material/InputLabel';
import { menuItemClasses } from '@mui/material/MenuItem';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { paginationItemClasses } from '@mui/material/PaginationItem';
import {
  alpha,
  Components,
  PaletteColor,
  createTheme as createMuiTheme,
  TypographyVariantsOptions,
} from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { tableRowClasses } from '@mui/material/TableRow';

import { breakpoints } from './breakpoints';
import { createThemePaletteOptions } from './createPaletteOptions';
import { createSizing } from './createSizing';

import '@mui/lab/themeAugmentation';

const muiTheme = createMuiTheme();

const sizing = createSizing();

/**
 * Creates and returns component overrides for a Material-UI theme.
 *
 * @param options - The options for creating theme components: paletteOptions and typographyOptions
 * @returns The object that contains the component overrides for Material-UI theme components
 *
 * @public
 */
export const createThemeComponents = ({
  paletteOptions,
  typographyOptions,
}: {
  paletteOptions: ReturnType<typeof createThemePaletteOptions>;
  typographyOptions: TypographyVariantsOptions;
}): Components => {
  return {
    MuiAlert: {
      styleOverrides: {
        action: {
          'a, button': {
            color: 'inherit',
          },
          color: 'inherit',
          paddingTop: 0,
        },
        filledError: {
          [`.${alertClasses.icon}`]: {
            color: paletteOptions.error.main,
          },
          backgroundColor: paletteOptions.alert.error.background,
          color: paletteOptions.alert.error.content,
        },
        filledInfo: {
          [`.${alertClasses.icon}`]: {
            color: paletteOptions.info.main,
          },
          backgroundColor: paletteOptions.alert.info.background,
          color: paletteOptions.alert.info.content,
        },
        filledSuccess: {
          [`.${alertClasses.icon}`]: {
            color: paletteOptions.success.contrastText,
          },
          backgroundColor: paletteOptions.alert.success.background,
          color: paletteOptions.alert.success.content,
        },
        filledWarning: {
          [`.${alertClasses.icon}`]: {
            color: paletteOptions.warning.main,
          },
          backgroundColor: paletteOptions.alert.warning.background,
          color: paletteOptions.alert.warning.content,
        },
        message: {
          '*': {
            color: 'inherit',
          },
          a: {
            textDecoration: 'underline',
          },
          color: 'inherit',
        },
        root: {
          ...typographyOptions.body2,
          '.MuiAlert-icon': {
            alignItems: 'center',
          },
          [`.${alertClasses.action}`]: {
            alignItems: 'center',
          },
        },
      },
    },
    MuiAlertTitle: {
      styleOverrides: {
        root: {
          letterSpacing: 0.15,
          marginBottom: 0,
          marginTop: 0,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: paletteOptions.neutral[300],
          color: '#000',
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          color: paletteOptions.secondary.darkest,
        },
        containedSecondary: {
          color: paletteOptions.secondary.contrastText,
        },
        outlinedSecondary: {
          color: paletteOptions.text.secondary,
        },
        outlinedSizeLarge: {
          padding: '7px 21px',
        },
        outlinedSizeMedium: {
          padding: '5px 15px',
        },
        outlinedSizeSmall: {
          padding: '3px 9px',
        },
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          [`&.${buttonClasses.text}.${buttonClasses.colorSecondary}`]: {
            color: paletteOptions.text.secondary,
          },
        },
        sizeLarge: {
          padding: '8px 22px',
        },
        sizeMedium: {
          padding: '6px 16px',
        },
        sizeSmall: {
          padding: '4px 10px',
        },
        textSizeMedium: {
          fontWeight: 600,
        },
        textSizeSmall: {
          lineHeight: '170%',
        },
      },
      variants: [
        {
          props: {
            color: 'inherit',
            variant: 'contained',
          },
          style: {
            backgroundColor: paletteOptions.grey?.[300],
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: paletteOptions.background.paper,
          borderRadius: 20,
          boxShadow: '0px 0px 0px 0.5px rgba(0, 0, 0, 0.03), 0px 5px 22px 0px rgba(0, 0, 0, 0.04)',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: '24px',
          },
          padding: '24px 24px',
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        subheaderTypographyProps: {
          marginTop: 0.5,
          variant: 'body2',
          whiteSpace: 'pre-line',
        },
        titleTypographyProps: {
          variant: 'h6',
        },
      },
      styleOverrides: {
        root: {
          padding: '32px 24px 16px',
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        checkedIcon: (
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M9 3.5C5.68629 3.5 3 6.18629 3 9.5V15.5C3 18.8137 5.68629 21.5 9 21.5H15C18.3137 21.5 21 18.8137 21 15.5V9.5C21 6.18629 18.3137 3.5 15 3.5H9ZM16.7179 10.1961C17.1024 9.79966 17.0926 9.16657 16.6961 8.7821C16.2997 8.39763 15.6666 8.40737 15.2821 8.80385L10.6667 13.5635L8.7179 11.5539C8.33343 11.1574 7.70034 11.1476 7.30385 11.5321C6.90737 11.9166 6.89763 12.5497 7.2821 12.9461L9.94877 15.6961C10.1371 15.8904 10.3961 16 10.6667 16C10.9372 16 11.1962 15.8904 11.3846 15.6961L16.7179 10.1961Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        ),
        color: 'primary',
        icon: (
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              height="16"
              rx="5"
              stroke="currentColor"
              strokeWidth="2"
              width="16"
              x="4"
              y="4.5"
            />
          </svg>
        ),
        indeterminateIcon: (
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M9 5.5H15C17.2091 5.5 19 7.29086 19 9.5V15.5C19 17.7091 17.2091 19.5 15 19.5H9C6.79086 19.5 5 17.7091 5 15.5V9.5C5 7.29086 6.79086 5.5 9 5.5ZM3 9.5C3 6.18629 5.68629 3.5 9 3.5H15C18.3137 3.5 21 6.18629 21 9.5V15.5C21 18.8137 18.3137 21.5 15 21.5H9C5.68629 21.5 3 18.8137 3 15.5V9.5ZM8 11.5C7.44772 11.5 7 11.9477 7 12.5C7 13.0523 7.44772 13.5 8 13.5H16C16.5523 13.5 17 13.0523 17 12.5C17 11.9477 16.5523 11.5 16 11.5H8Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        ),
      },
      styleOverrides: {
        sizeSmall: {
          padding: '7px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        colorSuccess: (props) => ({
          backgroundColor:
            props.ownerState.variant === 'filled' ? paletteOptions.success.main : undefined,
          borderColor:
            props.ownerState.variant === 'outlined' ? paletteOptions.success.main : undefined,
        }),
        colorWarning: (props) => ({
          backgroundColor:
            props.ownerState.variant === 'filled' ? paletteOptions.warning.main : undefined,
          borderColor:
            props.ownerState.variant === 'outlined'
              ? alpha(paletteOptions.warning.main, 0.5)
              : undefined,
        }),
        filled: {
          color: paletteOptions.secondary.darkest,
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        filledDefault: {
          color: paletteOptions.text.primary,
        },

        icon: {
          color: paletteOptions.action.active,
        },
        root: {
          '& span': {
            fontFeatureSettings: "'clig' off",
            letterSpacing: '0.16px',
            lineHeight: '18px',
            paddingLeft: '10px',
            paddingRight: '10px',
          },
          borderRadius: '12px',
          fontWeight: 500,
          height: '24px',
          paddingBottom: '3px',
          paddingTop: '3px',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          [`@media (min-width: ${breakpoints.sm}px)`]: {
            paddingLeft: 40,
            paddingRight: 40,
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        columnHeader: {
          borderRadius: '8px 8px 0 0 ',
          padding: '0px 8px',
        },
        filterForm: {
          alignItems: 'flex-end',
        },
        root: {
          '& .MuiDataGrid-cell': {
            backgroundColor: paletteOptions.background.table,
            height: sizing.tableRowHeight,
            paddingBottom: 0,
            paddingTop: 0,
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '& .MuiDataGrid-withBorderColor': {
            borderColor: paletteOptions.divider,
          },
          ['--DataGrid-rowBorderColor']: paletteOptions.divider,
          borderRadius: 1.5,
        },
        row: {
          '&.Mui-selected': {
            '&:hover': {
              backgroundColor: paletteOptions.primary.hovered,
            },
            backgroundColor: 'unset',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '#nprogress': {
          pointerEvents: 'none',
        },
        '#nprogress .bar': {
          height: 3,
          left: 0,
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 2000,
        },
        '#root, #__next': {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        },
        '*': {
          boxSizing: 'border-box',
        },
        body: {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100%',
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        onClick: (event) => event.stopPropagation(),
      },
      styleOverrides: {
        paper: {
          borderRadius: '20px',
          maxWidth: 600,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: paletteOptions.background.paper,
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        input: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '24px',
        },
        root: {
          '&:after': {
            display: 'none',
          },
          '&:before': {
            display: 'none',
          },
          backgroundColor: 'transparent',
          borderRadius: 8,
          '&:hover': {
            backgroundColor: paletteOptions.action.hover,
          },
          borderStyle: 'solid',
          borderColor: paletteOptions.neutral[300],
          borderWidth: 1,
          color: paletteOptions.text.primary,
          overflow: 'hidden',
          transition: muiTheme.transitions.create(['border-color', 'box-shadow']),
          [`&.${filledInputClasses.disabled}`]: {
            backgroundColor: 'transparent',
          },
          [`&.${filledInputClasses.focused}`]: {
            backgroundColor: 'transparent',
            borderColor: paletteOptions.primary.main,
            boxShadow: `${paletteOptions.primary.main} 0 0 0 2px`,
          },
          [`&.${filledInputClasses.error}`]: {
            borderColor: paletteOptions.error.main,
            boxShadow: `${paletteOptions.error.main} 0 0 0 2px`,
          },
        },
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        component: 'div',
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: paletteOptions.background.table,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,
          [`&.${inputLabelClasses.filled}`]: {
            transform: 'translate(12px, 18px) scale(1)',
          },
          [`&.${inputLabelClasses.shrink}`]: {
            [`&.${inputLabelClasses.standard}`]: {
              transform: 'translate(0, -1.5px) scale(0.85)',
            },
            [`&.${inputLabelClasses.filled}`]: {
              transform: 'translate(12px, 6px) scale(0.85)',
            },
            [`&.${inputLabelClasses.outlined}`]: {
              transform: 'translate(14px, -9px) scale(0.85)',
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          [`&:first-of-type`]: {
            paddingLeft: 24,
          },
          [`&:last-child`]: {
            paddingRight: 24,
          },
          borderBottom: 'none',
          padding: '0 16px',
          whiteSpace: 'nowrap',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        sizeSmall: {
          padding: 4,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          borderBottom: `1px solid ${paletteOptions.divider}`,
          height: sizing.tableRowHeight,
          borderTopLeftRadius: 8,
          [`& .${tableCellClasses.root}`]: {
            borderBottom: 'none',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 0.5,
            lineHeight: 1,
            paddingBottom: 0,
            paddingTop: 0,
            textTransform: 'uppercase',
          },
          [`& .${tableCellClasses.root}:first-of-type`]: {
            borderTopLeftRadius: '8px',
            paddingLeft: 24,
          },
          [`& .${tableCellClasses.root}:last-child`]: {
            borderTopRightRadius: '8px',
            paddingRight: 24,
          },
          [`& .${tableCellClasses.paddingCheckbox}`]: {
            paddingBottom: 4,
            paddingTop: 4,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '24px',
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          backgroundColor: paletteOptions.background.table,
          bottom: 0,
          flexShrink: 0,
          position: 'sticky',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            color: paletteOptions.text.secondary,
            opacity: 1,
          },
        },
        root: {
          [`&.${filledInputClasses.root}`]: {
            [`&.${filledInputClasses.disabled}`]: {
              borderColor: paletteOptions.divider,
            },
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          height: sizing.tableRowHeight,
          [`&:last-of-type:not(.${tableRowClasses.head}) .${tableCellClasses.root}:first-of-type`]:
            {
              borderBottomLeftRadius: '8px',
            },
          [`&:last-of-type:not(.${tableRowClasses.head}) .${tableCellClasses.root}:last-of-type`]: {
            borderBottomRightRadius: '8px',
          },
          [`&.${tableRowClasses.hover}`]: {
            cursor: 'pointer',
          },
          '&:not(:last-child)': {
            borderBottom: `1px solid ${paletteOptions.divider}`,
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          overflow: 'hidden',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          marginRight: '16px',
          minWidth: 'unset',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          maxHeight: '40vh',
          minWidth: 150,
          padding: 8,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '6px 8px',
          ...typographyOptions.body1,
          '&.bold': {
            fontWeight: 600,
          },
          color: paletteOptions.text.primary,
          svg: {
            color: paletteOptions.primary.light,
          },
          [`&.${menuItemClasses.selected}.bold`]: {
            backgroundColor: alpha(paletteOptions.primary.main, 0.12),
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '24px',
        },
        notchedOutline: {
          borderColor: paletteOptions.divider,
          transition: muiTheme.transitions.create(['border-color', 'box-shadow']),
        },
        root: {
          '&:hover': {
            backgroundColor: paletteOptions.action.hover,
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: paletteOptions.divider,
            },
          },
          [`&.${outlinedInputClasses.focused}`]: {
            backgroundColor: 'transparent',
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: (paletteOptions.primary as PaletteColor).main,
              borderWidth: '3px',
            },
          },
          [`&.${filledInputClasses.error}`]: {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: (paletteOptions.error as PaletteColor).main,
              borderWidth: '3px',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: paletteOptions.neutral[800],
          backgroundImage: 'none',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          [`&:not(.${backdropClasses.invisible})`]: {
            backgroundColor: alpha('#000', 0.5),
          },
        },
      },
    },
    MuiPopover: {
      defaultProps: {
        elevation: 16,
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
        },
      },
    },
    MuiRadio: {
      defaultProps: {
        color: 'primary',
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          '&&': {
            padding: '16px 24px',
          },
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          '&.Mui-active,&.Mui-completed': {
            color: paletteOptions.primary.main,
          },
          color: paletteOptions.secondary.main,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '20px 24px 4px',
        },
      },
    },
    MuiSwitch: {
      defaultProps: {
        color: 'primary',
      },
      styleOverrides: {
        switchBase: {
          color: paletteOptions.neutral[500],
        },
        track: {
          backgroundColor: paletteOptions.neutral[400],
          opacity: 1,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          [`&.${formLabelClasses.filled}`]: {
            color: paletteOptions.text.secondary,
          },
          [`&.${formLabelClasses.focused}`]: {
            color: paletteOptions.primary.main,
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '& + &': {
            marginLeft: 24,
          },
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.71,
          minHeight: 0,
          minWidth: 'auto',
          paddingLeft: 0,
          paddingRight: 0,
          textTransform: 'none',
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          [`&.${paginationItemClasses.selected}`]: {
            '&:hover': {
              backgroundColor: paletteOptions.primary.main,
              color: paletteOptions.primary.contrastText,
            },
            backgroundColor: paletteOptions.primary.main,
            color: paletteOptions.primary.contrastText,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 0,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'filled',
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          '&:hover': {
            backgroundColor: paletteOptions.primary.hovered,
            borderColor: paletteOptions.primary.dark,
          },
          justifyContent: 'flex-start',
          '& .MuiRadio-root:hover': {
            background: 'none',
          },
          textAlign: 'left',
          '&.Mui-selected': {
            borderColor: paletteOptions.primary.main,
          },
          textTransform: 'none',
          borderColor: paletteOptions.action.active,
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        enterTouchDelay: 0,
        leaveTouchDelay: 120_000, // tooltip hides automatically if short tapped on mobile, so we increase this delay to prevent it
      },
      styleOverrides: {
        tooltip: {
          backdropFilter: 'blur(6px)',
          background: alpha(paletteOptions.neutral[900], 0.8),
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          body1Bold: 'p',
          body2Bold: 'p',
        },
      },
    },
  };
};

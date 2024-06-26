# @cloudquery/cloud-ui

Cloud UI for CloudQuery Cloud App.

## Description

`@cloudquery/cloud-ui` is a library that provides various UI components and utilities that are used in CloudQuery Cloud App.

## Installation

To install the library, you can use npm:

```bash
npm install @cloudquery/cloud-ui
```

## Documentation

### Components

#### TableSelector

This component is used to select one or multiple tables from a list of plugin tables.

```tsx
import { TableSelector } from '@cloudquery/cloud-ui';

const tableList = []; // List of plugin tables

const [value, setValue] = React.useState({});
const callbacks = React.useRef([]);

const subscribeToTablesValueChange = React.useCallback((callback) => {
  callbacks.current.push(callback);

  return () => {
    callbacks.current = callbacks.current.filter((cb) => cb !== callback);
  };
}, []);

const handleChange = React.useCallback((value) => {
  setValue(value);
  callbacks.forEach((callback) => callback(value));
}, []);

const App = () => (
  <TableSelector
    subscribeToTablesValueChange={subscribeToTablesValueChange}
    value={value}
    onChange={handleChange}
    tableList={tableList}
  />
);
```

#### FormFieldGroup

This component is used to visually wrap one or more form fields.

```tsx
import { FormFieldGroup } from '@cloudquery/cloud-ui';
import TextField from '@mui/material/TextField';

const App = () => {
  return (
    <FormFieldGroup>
      <TextField />
    </FormFieldGroup>
  )
}
```

### Theme

#### createThemeOptions

The `createThemeOptions` function is a function that returns the theme options for the theme that can be passed to the `createTheme` Material-UI function.

```ts
export function createThemeOptions(): ThemeOptions
```

Example:

```tsx
import { createThemeOptions } from '@cloudquery/cloud-ui';
import createMuiTheme from '@mui/material/styles/createTheme';

const themeOptions = createThemeOptions();

const theme = createMuiTheme(themeOptions);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* your app code */}
    </ThemeProvider>
  )
}
```

#### Breakpoints

The `breakpoints` object is an object that contains the breakpoint values for the theme.

```ts
export const breakpoints: Record<keyof BreakpointOverrides, number>
```

#### Colors

The `colors` object is an object that contains the color options for the theme.

```ts
export const colors: {
  neutral: PaletteColor
  primary: PaletteColor
  secondary: PaletteColor
  error: PaletteColor
  warning: PaletteColor
  info: PaletteColor
  success: PaletteColor
}
```

#### createThemePaletteOptions

The `createThemePaletteOptions` function is a function that returns the palette options for the theme.

```ts
export function createThemePaletteOptions(): PaletteOptions
```

#### createThemeTypographyOptions

The `createThemeTypographyOptions` function is a function that returns the typography options for the theme.

```ts
export function createThemeTypographyOptions(): TypographyOptions
```

#### createThemeShadows

The `createThemeShadows` function is a function that returns the shadow options for the theme.

```ts
export function createThemeShadows(): Shadows
```

#### createThemeComponents

The `createThemeComponents` function is a function that returns the component options for the theme.
It requires `paletteOptions` and `typographyOptions` as parameters that should satisfy the return type of `createThemePaletteOptions` and `createThemeTypographyOptions` respectively.

```ts
export function createThemeComponents({ paletteOptions, typographyOptions }: {
  paletteOptions: ReturnType<typeof createThemePaletteOptions>;
  typographyOptions: TypographyOptions;
}): Components
```

## Development

### Building the Library

To build the library, run:

```bash
npm run build
```

### Running Tests

To run the test suite, execute:

```bash
npm test
```

## Contributing

If you encounter any issues or have feature requests, please feel free to open an issue on the [GitHub repository](https://github.com/cloudquery/cloud-ui/issues).

## License

This project is licensed under the [Mozilla Public License.](LICENSE).

import React, { ReactNode } from 'react';

import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import { render as rtlRender } from '@testing-library/react';

import { createThemeOptions } from '../theme';

type RenderParams = Parameters<typeof rtlRender>;

export function renderWithTheme(ui: RenderParams[0], options?: RenderParams[1]) {
  function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={createTheme(createThemeOptions())}>{children}</ThemeProvider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

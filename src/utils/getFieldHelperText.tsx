import { ReactNode } from 'react';

import Box from '@mui/material/Box';

export function getFieldHelperText(
  errorMessage: string | undefined,
  helperText: string | ReactNode,
) {
  if (!errorMessage) {
    return helperText;
  }

  const parsedErrorMessage = errorMessage.endsWith('.') ? `${errorMessage} ` : `${errorMessage}. `;
  if (typeof helperText === 'string') {
    return (
      <Box component="span" whiteSpace="pre-line">
        {parsedErrorMessage}
        {helperText}
      </Box>
    );
  }

  return (
    <Box component="span" whiteSpace="pre-line">
      {parsedErrorMessage}
      {helperText}
    </Box>
  );
}

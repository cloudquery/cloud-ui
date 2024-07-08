import { useCallback } from 'react';

import Button from '@mui/material/Button';
import { SxProps } from '@mui/system';

interface Props {
  // The initial value of the field
  initialValue: string | undefined;
  // Whether the field is currently resetted or not
  isResetted: boolean;
  // The function to call to update the field value
  onChange: (value: string) => void;
  // The selector of the input to focus after the reset
  inputSelectorToFocus?: string;
  // The sx props to apply to the button
  sx?: SxProps;
}

/**
 * This component is used to reset a form field whose initial value
 * includes environment variable
 *
 * @public
 */
export function FormFieldReset({
  initialValue,
  isResetted,
  onChange,
  inputSelectorToFocus,
  sx,
}: Props) {
  const handleReset = useCallback(() => {
    onChange('');
    if (inputSelectorToFocus) {
      setTimeout(() => {
        const element = document.querySelector(inputSelectorToFocus) as HTMLInputElement | null;
        element?.focus();
      }, 0);
    }
  }, [onChange, inputSelectorToFocus]);

  const handleCancel = useCallback(() => {
    onChange(initialValue);
  }, [onChange, initialValue]);

  if (isResetted) {
    return (
      <Button onClick={handleCancel} sx={sx} variant="outlined">
        Cancel
      </Button>
    );
  }

  return (
    <Button onClick={handleReset} sx={sx} variant="outlined">
      Reset
    </Button>
  );
}

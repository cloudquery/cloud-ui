import SearchIcon from '@mui/icons-material/Search';
import styled from '@mui/material/styles/styled';
import TextField, { TextFieldProps } from '@mui/material/TextField';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    '&::placeholder': {
      color: theme.palette.neutral[200],
    },
    color: theme.palette.neutral[200],
    padding: 0,
  },
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.background.paperTertiary,
    border: 'none',
    borderRadius: 12,
    height: 52,
    padding: '0 24px',
    width: '100%',
  },
}));

/**
 * This component displays a search field
 *
 * @public
 */
export function SearchField(props: TextFieldProps) {
  return (
    <StyledTextField
      {...props}
      InputProps={{
        startAdornment: <SearchIcon sx={{ fontSize: 20, marginRight: 1 }} />,
      }}
    />
  );
}

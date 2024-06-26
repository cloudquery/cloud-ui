import { useId, useRef, useState } from 'react';

import FilterIcon from '@mui/icons-material/FilterAlt';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Menu from '@mui/material/Menu';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import useTheme from '@mui/material/styles/useTheme';

import { TableSelectorSearchField } from './searchField';

interface Props {
  onSearchChange: (value: string) => void;
  onTableTypeChange: (value: 'all' | 'selected' | 'unselected') => void;
  searchValue: string;
  tableTypeValue: 'all' | 'selected' | 'unselected';
}

export function TableSelectorFilters({
  onSearchChange,
  onTableTypeChange,
  searchValue,
  tableTypeValue,
}: Props) {
  const { palette } = useTheme();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const menuToggleId = useId();

  return (
    <>
      <TableSelectorSearchField
        fullWidth={true}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tables"
        value={searchValue}
      />
      <Box>
        <Button
          ref={menuToggleRef}
          aria-controls={menuIsOpen ? menuId : undefined}
          aria-expanded={menuIsOpen ? 'true' : undefined}
          aria-haspopup="true"
          endIcon={<FilterIcon />}
          id={menuToggleId}
          onClick={() => setMenuIsOpen(true)}
          sx={{
            borderColor: palette.neutral[300],
            color: tableTypeValue === 'all' ? palette.text.secondary : palette.text.primary,
            height: '100%',
          }}
          variant="outlined"
        >
          Filter
        </Button>
        <Menu
          anchorEl={menuToggleRef.current}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
          id={menuId}
          MenuListProps={{
            'aria-labelledby': menuToggleId,
          }}
          onClose={() => setMenuIsOpen(false)}
          open={menuIsOpen || false}
          transformOrigin={{
            horizontal: 'right',
            vertical: -60,
          }}
        >
          <Box paddingLeft={1.5} paddingRight={2.5}>
            <RadioGroup
              onChange={(e) =>
                onTableTypeChange(e.target.value as 'all' | 'selected' | 'unselected')
              }
              sx={{ paddingLeft: 0.5, paddingRight: 1.5 }}
              value={tableTypeValue}
            >
              <FormControlLabel control={<Radio size="small" />} label="Show all" value="all" />
              <FormControlLabel
                control={<Radio size="small" />}
                label="Show selected"
                value="selected"
              />
              <FormControlLabel
                control={<Radio size="small" />}
                label="Show unselected"
                value="unselected"
              />
            </RadioGroup>
          </Box>
        </Menu>
      </Box>
    </>
  );
}

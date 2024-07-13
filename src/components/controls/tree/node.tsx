import React, { FC, ReactNode } from 'react';

import ListItem, { ListItemProps } from '@mui/material/ListItem';
import { alpha } from '@mui/material/styles';
import useTheme from '@mui/material/styles/useTheme';

import { usePluginSectionTableListKeyboardNavigation } from './utils/useKeyboardNavigation';

interface Props extends ListItemProps {
  children: ReactNode;
  isExpanded: boolean;
  isSelected: boolean;
  onSelect: () => void;
}

const _TreeNode: FC<Props> = ({ children, isExpanded, isSelected, onSelect, sx, ...props }) => {
  const { palette } = useTheme();
  const { handleFocus, handleKeyDown, listItemRef } =
    usePluginSectionTableListKeyboardNavigation(onSelect);

  return (
    <ListItem
      ref={listItemRef}
      aria-expanded={isExpanded}
      aria-selected={isSelected}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      role="treeitem"
      sx={{
        '&:focus>*:first-of-type:not(ul)': {
          bgcolor: alpha(palette.primary.main, 0.12),
        },
        '&>*:first-of-type:not(ul):hover': {
          bgcolor: palette.action.hover,
          cursor: 'pointer',
        },
        display: 'block',
        outline: 'none',
        padding: 0,
        ...sx,
      }}
      tabIndex={-1}
      {...props}
    >
      {children}
    </ListItem>
  );
};

/**
 * This component is used as node element for the tree.
 *
 * @public
 */
export const TreeNode = React.memo(_TreeNode);

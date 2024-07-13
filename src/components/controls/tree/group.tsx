import React, { FC, ReactNode } from 'react';

import List, { ListProps } from '@mui/material/List';

interface Props extends ListProps {
  children: ReactNode;
}

const _TreeGroup: FC<Props> = ({ children, ...props }) => {
  return (
    <List role="group" {...props}>
      {children}
    </List>
  );
};

/**
 * This component is used for grouping tree nodes inside a `TreeNode`.
 *
 * @public
 */
export const TreeGroup = React.memo(_TreeGroup);

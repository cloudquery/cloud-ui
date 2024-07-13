import React, { ReactNode, useCallback, useRef } from 'react';

import List, { ListProps } from '@mui/material/List';

interface Props extends ListProps {
  children: ReactNode;
}

/**
 * This component is used as root element for the tree.
 *
 * @public
 */
export function TreeRoot({ children, ...props }: Props) {
  const treeRef = useRef<HTMLUListElement | null>(null);

  const handleFocus = useCallback((event: React.FocusEvent<HTMLUListElement>) => {
    if (event.target === treeRef.current) {
      const selectedNode = treeRef.current.querySelector(
        '[aria-selected="true"]',
      ) as HTMLLIElement | null;
      if (selectedNode) {
        selectedNode.focus();
      } else {
        const firstNode = treeRef.current.querySelector(
          '[role="treeitem"]',
        ) as HTMLLIElement | null;
        firstNode?.focus();
      }
    }
  }, []);

  return (
    <List ref={treeRef} onFocus={handleFocus} role="tree" tabIndex={0} {...props}>
      {children}
    </List>
  );
}

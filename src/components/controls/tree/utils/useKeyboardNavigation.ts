import React, { useCallback, useRef } from 'react';

export function usePluginSectionTableListKeyboardNavigation(onSelect: () => void) {
  const listItemRef = useRef<HTMLLIElement | null>(null);

  const moveFocusToNextNode = useCallback((currentNode: HTMLLIElement | null) => {
    if (!currentNode) return;

    const childList = currentNode.querySelector('[role="group"]') as HTMLUListElement | null;
    if (childList && childList.firstElementChild) {
      (childList.firstElementChild as HTMLLIElement).focus();
    } else {
      let nextNode = currentNode.nextElementSibling as HTMLLIElement | null;
      while (nextNode && nextNode.getAttribute('role') !== 'treeitem') {
        nextNode = nextNode.nextElementSibling as HTMLLIElement | null;
      }
      if (nextNode) {
        nextNode.focus();
      } else {
        // Traverse up to find the next sibling of the parent
        let parent = currentNode.parentElement?.closest(
          '[role="treeitem"]',
        ) as HTMLLIElement | null;
        while (parent) {
          nextNode = parent.nextElementSibling as HTMLLIElement | null;
          while (nextNode && nextNode.getAttribute('role') !== 'treeitem') {
            nextNode = nextNode.nextElementSibling as HTMLLIElement | null;
          }
          if (nextNode) {
            nextNode.focus();
            break;
          }
          parent = parent.parentElement?.closest('[role="treeitem"]') as HTMLLIElement | null;
        }
      }
    }
  }, []);

  const moveFocusToPreviousNode = useCallback((currentNode: HTMLLIElement | null) => {
    if (!currentNode) return;

    let previousNode = currentNode.previousElementSibling as HTMLLIElement | null;
    while (previousNode && previousNode.getAttribute('role') !== 'treeitem') {
      previousNode = previousNode.previousElementSibling as HTMLLIElement | null;
    }
    if (previousNode) {
      const childList = previousNode.querySelector('[role="group"]') as HTMLUListElement | null;
      if (childList && childList.lastElementChild) {
        // Focus the last child node if it exists
        (childList.lastElementChild as HTMLLIElement).focus();
      } else {
        previousNode.focus();
      }
    } else {
      // Focus the parent node if there is no previous sibling
      const parent = currentNode.parentElement?.closest(
        '[role="treeitem"]',
      ) as HTMLLIElement | null;
      parent?.focus();
    }
  }, []);

  const moveFocusToFirstNode = useCallback(() => {
    const firstNode = document.querySelector('[role="treeitem"]') as HTMLLIElement | null;
    firstNode?.focus();
  }, []);

  const moveFocusToLastNode = useCallback(() => {
    // eslint-disable-next-line unicorn/prefer-spread
    const treeItems = Array.from(document.querySelectorAll('[role="treeitem"]')) as HTMLLIElement[];
    const lastNode = treeItems.at(-1) as HTMLLIElement | null;
    lastNode?.focus();
  }, []);

  const handleFocus = useCallback(() => {
    listItemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLLIElement>) => {
      if (event.shiftKey && event.key === 'Tab') {
        const treeRoot = listItemRef.current?.closest('[role="tree"]') as HTMLElement | null;
        const previousFocusableElement = treeRoot ? getPreviousFocusableElement(treeRoot) : null;
        if (previousFocusableElement) {
          previousFocusableElement.focus();
          event.preventDefault();
        }

        return;
      }

      switch (event.key) {
        case 'ArrowDown': {
          moveFocusToNextNode(listItemRef.current);
          event.preventDefault();
          event.stopPropagation();
          break;
        }
        case 'ArrowUp': {
          moveFocusToPreviousNode(listItemRef.current);
          event.preventDefault();
          event.stopPropagation();
          break;
        }
        case 'Home': {
          moveFocusToFirstNode();
          event.preventDefault();
          event.stopPropagation();
          break;
        }
        case 'End': {
          moveFocusToLastNode();
          event.preventDefault();
          event.stopPropagation();
          break;
        }
        case 'Enter':
        case ' ': {
          onSelect();
          event.preventDefault();
          event.stopPropagation();
          break;
        }
        default: {
          break;
        }
      }
    },
    [
      moveFocusToFirstNode,
      moveFocusToLastNode,
      moveFocusToNextNode,
      moveFocusToPreviousNode,
      onSelect,
    ],
  );

  return { handleFocus, handleKeyDown, listItemRef };
}

const getPreviousFocusableElement = (currentElement: HTMLElement): HTMLElement | null => {
  const focusableSelectors = 'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

  // Get all focusable elements in the document
  // eslint-disable-next-line unicorn/prefer-spread
  const focusableElements = Array.from(
    document.querySelectorAll(focusableSelectors),
  ) as HTMLElement[];

  // Get the current element
  // Find the index of the current element
  const currentIndex = focusableElements.indexOf(currentElement);

  // Traverse backwards to find the first previous focusable element
  let previousFocusableElement = null;
  for (let i = currentIndex - 1; i >= 0; i--) {
    if (focusableElements[i].offsetParent !== null) {
      // Check if element is visible
      previousFocusableElement = focusableElements[i];
      break;
    }
  }

  return previousFocusableElement;
};

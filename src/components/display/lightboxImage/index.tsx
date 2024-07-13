import React, { ImgHTMLAttributes, useCallback, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';

/**
 * This component displays an image that can be opened in a lightbox.
 *
 * @public
 */
export function LightboxImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      setOpen(true);
    }
  }, []);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setIsLoaded(false);
  }, []);

  const handleContainerClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const closestImage = (event.target as HTMLDivElement).closest('img');
      if (closestImage) {
        return;
      }

      handleClose();
    },
    [handleClose],
  );

  return (
    <>
      <button
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
      >
        <img {...props} style={{ display: 'block', ...props.style }} />
      </button>
      <Modal aria-label={props.alt} onClose={handleClose} open={open}>
        <Box
          height="100%"
          paddingX={2}
          paddingY={7}
          sx={{ position: 'relative' }}
          width="100%"
          onClick={handleContainerClick}
        >
          <IconButton
            autoFocus={true}
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
            title="Close"
          >
            <CloseIcon />
          </IconButton>
          <Stack
            alignItems="center"
            height="100%"
            justifyContent="center"
            overflow="auto"
            width="100%"
          >
            {!isLoaded && <CircularProgress />}
            <img
              {...props}
              data-testid="fullbox-image"
              onLoad={() => setIsLoaded(true)}
              style={{ height: 'auto', maxHeight: isLoaded ? undefined : 0, maxWidth: '100%' }}
            />
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

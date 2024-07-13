import { screen, fireEvent } from '@testing-library/react';

import { LightboxImage } from '..';
import { renderWithTheme } from '../../../../utils/tests/renderWithTheme';

describe('LightboxImage Component', () => {
  const defaultProps = {
    src: 'test-image.jpg',
    alt: 'Test Image',
  };

  test('renders image with given props', () => {
    renderWithTheme(<LightboxImage {...defaultProps} />);

    const imgElement = screen.getByAltText('Test Image');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'test-image.jpg');

    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });

  test('opens modal on click', () => {
    renderWithTheme(<LightboxImage {...defaultProps} />);

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    const modalElement = screen.getByRole('presentation');
    expect(modalElement).toBeInTheDocument();
  });

  test('opens modal on Enter key press', () => {
    renderWithTheme(<LightboxImage {...defaultProps} />);

    const buttonElement = screen.getByRole('button');
    fireEvent.keyDown(buttonElement, { key: 'Enter', code: 'Enter' });

    const modalElement = screen.getByRole('presentation');
    expect(modalElement).toBeInTheDocument();
  });

  test('opens modal on Space key press', () => {
    renderWithTheme(<LightboxImage {...defaultProps} />);

    const buttonElement = screen.getByRole('button');
    fireEvent.keyDown(buttonElement, { key: ' ', code: 'Space' });

    const modalElement = screen.getByRole('presentation');
    expect(modalElement).toBeInTheDocument();
  });

  test('closes modal on close button click', () => {
    renderWithTheme(<LightboxImage {...defaultProps} />);

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    const modalElement = screen.queryByRole('presentation');
    expect(modalElement).not.toBeInTheDocument();
  });

  test('displays CircularProgress while image is loading', () => {
    renderWithTheme(<LightboxImage {...defaultProps} />);

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).toBeInTheDocument();
  });

  test('displays image after loading', async () => {
    renderWithTheme(<LightboxImage {...defaultProps} />);

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    const imgElement = screen.queryByTestId('fullbox-image');
    expect(imgElement).toHaveStyle('maxHeight: 0');

    fireEvent.load(imgElement);

    expect(imgElement.getAttribute('style')).toBe('height: auto; max-width: 100%;');
  });

  test('modal has the correct aria-label', () => {
    renderWithTheme(<LightboxImage {...defaultProps} />);

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    const modalElement = screen.getByRole('presentation');
    expect(modalElement).toHaveAttribute('aria-label', 'Test Image');
  });
});

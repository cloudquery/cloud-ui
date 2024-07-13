import { screen, fireEvent } from '@testing-library/react';

import { RadioGroupSelector } from '..';
import { renderWithTheme, theme } from '../../../../utils/tests/renderWithTheme';

const items = [
  { title: 'Option 1', subtitle: 'Subtitle 1', value: '1' },
  { title: 'Option 2', subtitle: 'Subtitle 2', value: '2' },
  { title: 'Option 3', subtitle: 'Subtitle 3', value: '3', disabled: true },
];

const defaultProps = {
  noExistingItems: false,
  onChange: jest.fn(),
  value: '1',
  title: 'Test Title',
  items,
};

describe('RadioGroupSelector Component', () => {
  test('renders correctly with given props', () => {
    renderWithTheme(<RadioGroupSelector {...defaultProps} />);

    expect(screen.getByLabelText('Test Title')).toBeInTheDocument();
    for (const item of items) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      if (item.subtitle) {
        expect(screen.getByText(item.subtitle)).toBeInTheDocument();
      }
    }
  });

  test('initially selected value is correct', () => {
    renderWithTheme(<RadioGroupSelector {...defaultProps} />);

    const selectedItem = items.find((item) => item.value === defaultProps.value);
    expect(screen.getByText(selectedItem.title)).toHaveStyle('opacity: 1');
  });

  test('onChange is called with correct value when an item is clicked', () => {
    renderWithTheme(<RadioGroupSelector {...defaultProps} />);

    const newValue = items[1].value;
    fireEvent.click(screen.getByText(items[1].title));
    expect(defaultProps.onChange).toHaveBeenCalledWith(newValue);
  });

  test('disabled item cannot be selected', () => {
    renderWithTheme(<RadioGroupSelector {...defaultProps} />);

    fireEvent.click(screen.getByText(items[2].title));
    expect(defaultProps.onChange).not.toHaveBeenCalledWith(items[2].value);
  });

  test('item styles are correct based on selection', () => {
    renderWithTheme(<RadioGroupSelector {...defaultProps} />);

    for (const item of items) {
      const expectedOpacity = item.value === defaultProps.value ? '1' : '0.8';
      expect(screen.getByText(item.title)).toHaveStyle(`opacity: ${expectedOpacity}`);
      if (item.subtitle) {
        expect(screen.getByText(item.subtitle)).toHaveStyle(`opacity: ${expectedOpacity}`);
      }
    }
  });

  test('title is rendered if provided', () => {
    renderWithTheme(<RadioGroupSelector {...defaultProps} />);
    expect(screen.getByLabelText('Test Title')).toBeInTheDocument();
  });

  test('title is not rendered if not provided', () => {
    const { title, ...propsWithoutTitle } = defaultProps;
    renderWithTheme(<RadioGroupSelector {...propsWithoutTitle} />);
    expect(screen.queryByLabelText(title)).not.toBeInTheDocument();
  });

  test('changes theme styles correctly', () => {
    renderWithTheme(<RadioGroupSelector {...defaultProps} />);

    for (const item of items) {
      const isSelected = item.value === defaultProps.value;
      const expectedColor = isSelected ? theme.palette.text.primary : theme.palette.text.secondary;
      expect(screen.getByText(item.title)).toHaveStyle(`color: ${expectedColor}`);
      if (item.subtitle) {
        expect(screen.getByText(item.subtitle)).toHaveStyle(`color: ${expectedColor}`);
      }
    }
  });
});

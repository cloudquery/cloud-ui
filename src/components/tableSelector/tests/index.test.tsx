import { useState } from 'react';

import { screen, fireEvent, act } from '@testing-library/react';

import { TableSelector } from '..';
import { renderWithTheme } from '../../../tests/renderWithTheme';
import { PluginTableListItem } from '../types';

const mockTableList: PluginTableListItem[] = [
  { name: 'Table1', parent: '', relationTables: [] },
  { name: 'Table2', parent: '', relationTables: [] },
  { name: 'Table3', parent: '', relationTables: [] },
];

const mockSubscribeToTablesValueChange = jest.fn();
const mockOnChange = jest.fn();

describe('TableSelector', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    renderWithTheme(
      <TableSelector
        subscribeToTablesValueChange={mockSubscribeToTablesValueChange}
        value={{}}
        onChange={mockOnChange}
        tableList={mockTableList}
      />,
    );

    expect(screen.getByPlaceholderText('Search tables')).toBeInTheDocument();
    expect(screen.getByText('Filter')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Filter'));
    expect(screen.getByLabelText('Show all')).toBeInTheDocument();
  });

  test('filters tables based on search input', () => {
    renderWithTheme(
      <TableSelector
        subscribeToTablesValueChange={mockSubscribeToTablesValueChange}
        value={{}}
        onChange={mockOnChange}
        tableList={mockTableList}
      />,
    );

    const searchInput = screen.getByPlaceholderText('Search tables');
    fireEvent.change(searchInput, { target: { value: 'Table1' } });

    expect(screen.getByText('Table1')).toBeInTheDocument();
    expect(screen.queryByText('Table2')).not.toBeInTheDocument();
    expect(screen.queryByText('Table3')).not.toBeInTheDocument();
  });

  test('selects and deselects all tables', () => {
    const { rerender } = renderWithTheme(
      <TableSelector
        subscribeToTablesValueChange={mockSubscribeToTablesValueChange}
        value={{}}
        onChange={mockOnChange}
        tableList={mockTableList}
      />,
    );

    const selectAllCheckbox = screen.queryByLabelText('3 tables (0 selected)');
    fireEvent.click(selectAllCheckbox);

    expect(mockOnChange).toHaveBeenCalledWith({
      Table1: true,
      Table2: true,
      Table3: true,
    });

    rerender(
      <TableSelector
        subscribeToTablesValueChange={mockSubscribeToTablesValueChange}
        value={{
          Table1: true,
          Table2: true,
          Table3: true,
        }}
        onChange={mockOnChange}
        tableList={mockTableList}
      />,
    );
    const deselectAllCheckbox = screen.queryByLabelText('3 tables (3 selected)');
    fireEvent.click(deselectAllCheckbox);

    expect(mockOnChange).toHaveBeenCalledWith({});
  });

  test('handles individual table selection', () => {
    const { rerender } = renderWithTheme(
      <TableSelector
        subscribeToTablesValueChange={mockSubscribeToTablesValueChange}
        value={{}}
        onChange={mockOnChange}
        tableList={mockTableList}
      />,
    );

    const table1Checkbox = screen.getByLabelText('Table1');
    fireEvent.click(table1Checkbox);

    expect(mockOnChange).toHaveBeenCalledWith({ Table1: true });

    rerender(
      <TableSelector
        subscribeToTablesValueChange={mockSubscribeToTablesValueChange}
        value={{ Table1: true }}
        onChange={mockOnChange}
        tableList={mockTableList}
      />,
    );

    fireEvent.click(table1Checkbox);

    expect(mockOnChange).toHaveBeenCalledWith({});
  });

  test('displays the correct number of selected tables', () => {
    renderWithTheme(
      <TableSelector
        subscribeToTablesValueChange={mockSubscribeToTablesValueChange}
        value={{ Table1: true }}
        onChange={mockOnChange}
        tableList={mockTableList}
      />,
    );

    expect(screen.getByText('3 tables (1 selected)')).toBeInTheDocument();
  });

  test('filters tables based on selected status', () => {
    renderWithTheme(
      <TableSelector
        subscribeToTablesValueChange={mockSubscribeToTablesValueChange}
        value={{ Table1: true, Table3: true }}
        onChange={mockOnChange}
        tableList={mockTableList}
      />,
    );

    fireEvent.click(screen.getByText('Filter'));
    fireEvent.click(screen.getByLabelText('Show selected'));

    expect(screen.getByText('Table1')).toBeInTheDocument();
    expect(screen.queryByText('Table2')).not.toBeInTheDocument();
    expect(screen.getByText('Table3')).toBeInTheDocument();
  });

  test('filters tables based on unselected status', () => {
    renderWithTheme(
      <TableSelector
        subscribeToTablesValueChange={mockSubscribeToTablesValueChange}
        value={{ Table1: true }}
        onChange={mockOnChange}
        tableList={mockTableList}
      />,
    );

    fireEvent.click(screen.getByText('Filter'));
    fireEvent.click(screen.getByLabelText('Show unselected'));

    expect(screen.queryByText('Table1')).not.toBeInTheDocument();
    expect(screen.getByText('Table2')).toBeInTheDocument();
    expect(screen.getByText('Table3')).toBeInTheDocument();
  });

  test('subscribes to tables value change', () => {
    const callbacks = [];
    const subscribeToTablesValueChange = (callback) => {
      callbacks.push(callback);

      return () => {
        callbacks.splice(callbacks.indexOf(callback), 1);
      };
    };
    let setValueRef: (value: Record<string, boolean>) => void = null;
    const Component = () => {
      const [value, setValue] = useState({});
      setValueRef = setValue;

      return (
        <TableSelector
          subscribeToTablesValueChange={subscribeToTablesValueChange}
          value={value}
          onChange={mockOnChange}
          tableList={mockTableList}
        />
      );
    };
    renderWithTheme(<Component />);
    act(() => {
      setValueRef({ Table1: true });

      for (const callback of callbacks) {
        callback({ Table1: true });
      }
    });

    expect(screen.getByLabelText('3 tables (1 selected)')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Filter'));
    fireEvent.click(screen.getByLabelText('Show selected'));

    expect(screen.getByText('Table1')).toBeInTheDocument();
    expect(screen.queryByText('Table2')).not.toBeInTheDocument();
    expect(screen.queryByText('Table3')).not.toBeInTheDocument();
  });
});

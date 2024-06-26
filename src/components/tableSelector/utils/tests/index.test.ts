import { handleTableSelectorSelect } from '..';
import { PluginTableListItem } from '../../types';

describe('handleTableSelectorSelect', () => {
  let tableA: PluginTableListItem;
  let tableB: PluginTableListItem;
  let tableC: PluginTableListItem;
  let tableD: PluginTableListItem;

  beforeEach(() => {
    tableA = { name: 'TableA', relationTables: [] };
    tableB = { name: 'TableB', relationTables: [] };
    tableC = { name: 'TableC', relationTables: [] };
    tableD = { name: 'TableD', relationTables: [] };

    tableA.relationTables = [tableB];
    tableB.relationTables = [tableC];
    tableC.relationTables = [tableD];

    tableB.parentTable = tableA;
    tableC.parentTable = tableB;
    tableD.parentTable = tableC;
  });

  test('should select a table if it is not already selected', () => {
    const selectedTables = {};
    const result = handleTableSelectorSelect(selectedTables, tableA);
    expect(result).toEqual({ TableA: true });
  });

  test('should unselect a table if it is already selected', () => {
    const selectedTables = { TableA: true };
    const result = handleTableSelectorSelect(selectedTables, tableA);
    expect(result).toEqual({});
  });

  test('should select parent tables when a child table is selected', () => {
    const selectedTables = {};
    const result = handleTableSelectorSelect(selectedTables, tableD);
    expect(result).toEqual({ TableA: true, TableB: true, TableC: true, TableD: true });
  });

  test('should unselect all relation tables recursively when a table is unselected', () => {
    const selectedTables = { TableA: true, TableB: true, TableC: true, TableD: true };
    const result = handleTableSelectorSelect(selectedTables, tableA);
    expect(result).toEqual({});
  });

  test('should not select already selected parent tables again', () => {
    const selectedTables = { TableA: true };
    const result = handleTableSelectorSelect(selectedTables, tableD);
    expect(result).toEqual({ TableA: true, TableB: true, TableC: true, TableD: true });
  });

  test('should handle selection of a table with no parent or relation tables', () => {
    const tableE = { name: 'TableE', relationTables: [] };
    const selectedTables = {};
    const result = handleTableSelectorSelect(selectedTables, tableE);
    expect(result).toEqual({ TableE: true });
  });

  test('should handle unselection of a table with no parent or relation tables', () => {
    const tableE = { name: 'TableE', relationTables: [] };
    const selectedTables = { TableE: true };
    const result = handleTableSelectorSelect(selectedTables, tableE);
    expect(result).toEqual({});
  });

  test('should correctly handle complex table relationships', () => {
    const tableE = { name: 'TableE', relationTables: [], parentTable: tableD };
    tableD.relationTables.push(tableE);

    const selectedTables = {};
    const result = handleTableSelectorSelect(selectedTables, tableE);
    expect(result).toEqual({
      TableA: true,
      TableB: true,
      TableC: true,
      TableD: true,
      TableE: true,
    });
  });

  test('should unselect all nested relation tables', () => {
    const tableE = { name: 'TableE', relationTables: [] };
    tableC.relationTables.push(tableE);

    const selectedTables = { TableA: true, TableB: true, TableC: true, TableD: true, TableE: true };
    const result = handleTableSelectorSelect(selectedTables, tableA);
    expect(result).toEqual({});
  });
});

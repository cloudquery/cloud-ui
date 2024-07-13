import { SyncNodePluginTableListItem } from '../types';

export function handleSyncNodeTableSelectorSelect(
  selectedTables: Record<string, boolean>,
  tableListItem: SyncNodePluginTableListItem,
) {
  const selected = {
    ...selectedTables,
  };

  if (selectedTables[tableListItem.name]) {
    delete selected[tableListItem.name];

    const unselectRelationTables = (tableListItem: SyncNodePluginTableListItem) => {
      if (tableListItem.relationTables.length > 0) {
        for (const relationTable of tableListItem.relationTables) {
          delete selected[relationTable.name];
          unselectRelationTables(relationTable);
        }
      }
    };

    unselectRelationTables(tableListItem);
  } else {
    selected[tableListItem.name] = true;

    let currentTableListItem = tableListItem;

    while (currentTableListItem.parentTable) {
      selected[currentTableListItem.parentTable.name] = true;
      currentTableListItem = currentTableListItem.parentTable;
    }
  }

  return selected;
}

export function filterSyncNodeTableSelectorPluginTableList(
  tableList: SyncNodePluginTableListItem[],
  selectedTables: Record<string, boolean>,
  searchQuery: string,
  filterTablesValue?: 'all' | 'selected' | 'unselected',
) {
  if (!searchQuery && filterTablesValue === 'all') {
    return tableList;
  }

  const checkIfTableIsVisible = (
    tableListItem: SyncNodePluginTableListItem,
  ): SyncNodePluginTableListItem | undefined => {
    const filteredRelationTables = tableListItem.relationTables
      .map((tableListItem) => checkIfTableIsVisible(tableListItem))
      .filter(Boolean) as SyncNodePluginTableListItem[];

    if (filteredRelationTables.length > 0) {
      return {
        ...tableListItem,
        relationTables: filteredRelationTables,
      };
    }

    if (
      (filterTablesValue === 'selected' && !selectedTables[tableListItem.name]) ||
      (filterTablesValue === 'unselected' && selectedTables[tableListItem.name])
    ) {
      return undefined;
    }

    return tableListItem.name.toLowerCase().includes(searchQuery) ? tableListItem : undefined;
  };

  return tableList
    .map((tableListItem) => checkIfTableIsVisible(tableListItem))
    .filter(Boolean) as SyncNodePluginTableListItem[];
}

export function getSyncNodeTableSelectorPluginFlatTableList(
  pluginTables: SyncNodePluginTableListItem[],
) {
  const extract = (tableListItem: SyncNodePluginTableListItem) => {
    const list = [tableListItem];
    if (tableListItem.relationTables.length > 0) {
      for (const relationTable of tableListItem.relationTables) {
        list.push(...extract(relationTable));
      }
    }

    return list;
  };

  return pluginTables.flatMap((item) => extract(item));
}

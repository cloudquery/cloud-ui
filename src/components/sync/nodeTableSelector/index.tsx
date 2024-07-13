import { useCallback, useMemo, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import useTheme from '@mui/material/styles/useTheme';

import { SyncNodeTableSelectorFilters } from './filters';
import { SyncNodeTableSelectorListItem } from './listItem';
import { SyncNodePluginTableListItem, SubscribeToSyncNodeTablesValueChange } from './types';
import {
  filterSyncNodeTableSelectorPluginTableList,
  getSyncNodeTableSelectorPluginFlatTableList,
  handleSyncNodeTableSelectorSelect,
} from './utils';
import { TreeRoot } from '../../controls/tree';

interface Props {
  /**
   * This function is used to subscribe to the table values change.
   * It returns a function to unsubscribe.
   */
  subscribeToTablesValueChange: SubscribeToSyncNodeTablesValueChange;
  /** Error message to display if there is an error. */
  errorMessage?: string;
  /** Current selected table values. */
  value: Record<string, boolean>;
  /** Callback function to handle value changes. */
  onChange: (value: Record<string, boolean>) => void;
  /** List of tables to display in the selector. */
  tableList: SyncNodePluginTableListItem[];
}

/**
 * This component allows users to select tables from a list with filtering options.
 *
 * @public
 */
export function SyncNodeTableSelector({
  subscribeToTablesValueChange,
  errorMessage,
  value,
  onChange,
  tableList,
}: Props) {
  const { palette } = useTheme();

  const [searchValue, setSearchValue] = useState('');
  const [filterTablesValue, setFilterTablesValue] = useState<'all' | 'selected' | 'unselected'>(
    'all',
  );

  // Those refs are necessary to prevent the tree from updating on every render
  // caused by changing the "handleSelect" function
  const filteredFlatTableListRef = useRef<SyncNodePluginTableListItem[]>([]);
  const allTablesSelectedRef = useRef(false);
  const selectedTablesRef = useRef<Record<string, boolean>>(value);

  const searchValueTrimmed = searchValue.trim().toLowerCase();
  const filteredTableList = useMemo(
    () =>
      filterSyncNodeTableSelectorPluginTableList(
        tableList,
        value,
        searchValueTrimmed,
        filterTablesValue,
      ).filter((table) => !table.parent),
    [filterTablesValue, searchValueTrimmed, value, tableList],
  );
  const filteredFlatTableList = useMemo(
    () => getSyncNodeTableSelectorPluginFlatTableList(filteredTableList),
    [filteredTableList],
  );
  const allTablesSelected = useMemo(
    () => filteredFlatTableList.every((table) => value[table.name]),
    [filteredFlatTableList, value],
  );

  filteredFlatTableListRef.current = filteredFlatTableList;
  selectedTablesRef.current = value;
  allTablesSelectedRef.current = allTablesSelected;

  const handleSelect = useCallback(
    (tableListItem: SyncNodePluginTableListItem) => {
      onChange(handleSyncNodeTableSelectorSelect(selectedTablesRef.current, tableListItem));
    },
    [onChange],
  );

  const handleSelectAll = useCallback(() => {
    if (allTablesSelectedRef.current) {
      const selected = { ...selectedTablesRef.current };

      for (const table of filteredFlatTableListRef.current) {
        delete selected[table.name];
      }

      onChange(selected);
    } else {
      onChange({
        ...selectedTablesRef.current,
        ...Object.fromEntries(filteredFlatTableListRef.current.map(({ name }) => [name, true])),
      });
    }
  }, [onChange]);

  const noResults = filteredTableList.length === 0;

  const numberOfSelectedTables = Object.values(value).filter(Boolean).length;
  const maxHeight = Math.min(tableList.length, 11) * 38;

  return (
    <Box
      border={`1px solid ${errorMessage ? palette.error.main : palette.text.secondary}`}
      borderRadius={1}
      padding={2}
    >
      <Stack direction="row" marginBottom={2} spacing={1}>
        <SyncNodeTableSelectorFilters
          onSearchChange={setSearchValue}
          onTableTypeChange={setFilterTablesValue}
          searchValue={searchValue}
          tableTypeValue={filterTablesValue}
        />
      </Stack>
      <FormControlLabel
        control={
          <Checkbox
            checked={allTablesSelected || noResults}
            disabled={noResults}
            onChange={handleSelectAll}
            size="small"
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          />
        }
        label={
          searchValueTrimmed
            ? `${filteredFlatTableList.length} results of ${tableList.length} tables (${numberOfSelectedTables} selected)`
            : `${tableList.length} tables (${numberOfSelectedTables} selected)`
        }
        sx={{ marginLeft: 0, width: '100%' }}
      />
      <Box height={`min(${maxHeight}px, 90vh)`} maxHeight="90vh" overflow="auto">
        {!noResults && (
          <TreeRoot sx={{ maxWidth: '100%' }}>
            {filteredTableList.map((table) => (
              <SyncNodeTableSelectorListItem
                key={`${table.parent}-${table.name}`}
                valuesRef={selectedTablesRef}
                subscribeToTablesValueChange={subscribeToTablesValueChange}
                onSelect={handleSelect}
                selectedAsIndeterminate={filterTablesValue === 'unselected'}
                tableListItem={table}
              />
            ))}
          </TreeRoot>
        )}
      </Box>
    </Box>
  );
}

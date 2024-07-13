export interface SyncNodePluginTableListItem {
  name: string;
  parent?: string;
  relations?: string[];
  relationTables: SyncNodePluginTableListItem[];
  parentTable?: SyncNodePluginTableListItem;
}

type Callback = (tableValues: Record<string, boolean>) => void;
type Unsubscribe = () => void;

export type SubscribeToSyncNodeTablesValueChange = (callback: Callback) => Unsubscribe;

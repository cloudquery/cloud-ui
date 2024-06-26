export interface PluginTableListItem {
  name: string;
  parent?: string;
  relations?: string[];
  relationTables: PluginTableListItem[];
  parentTable?: PluginTableListItem;
}

type Callback = (tableValues: Record<string, boolean>) => void;
type Unsubscribe = () => void;

export type SubscribeToTablesValueChange = (callback: Callback) => Unsubscribe;

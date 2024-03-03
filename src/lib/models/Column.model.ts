export interface Column {
  header?: string;
  name: string;
  sorted?: number;
  sort_type?: boolean | null;
  editable?: Boolean;
  filter?: Boolean;
  case_sensitive_filter?: Boolean;
  hidden?: Boolean;
  width?: string;
  sortable?: Boolean;
  renderer?: any;
  type?: string;
  component?: any;
  editor?: any;
  on_component_init?: any;
  group_component?: any;
  group_aggregator?: any;
}

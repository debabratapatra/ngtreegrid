export interface Column {
    header?: string;
    name?: string;
    sorted: number;
    sort_type: string;
    editable: Boolean;
    filter: Boolean;
    case_sensitive_filter: Boolean;
    hidden: Boolean;
    sortable: Boolean;
    renderer?: any;
    type?: string;
    component?: any;
    editor?: any;
    on_component_init?: any;
}

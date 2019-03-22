export interface Column {
    header?: string;
    name?: string;
    sorted: number;
    sort_type: string;
    editable: Boolean;
    hidden: Boolean;
    sortable: Boolean;
    type?: string;
    component?: any;
    edit_component?: any;
    onComponentInit?: any;
}

import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'db-ngtreegrid',
  templateUrl: './ngtreegrid.component.html',
  styleUrls: ['./ngtreegrid.component.scss']
})
export class NgtreegridComponent implements OnChanges {

  processed_data: any[] = [];
  expand_tracker: Object = {};
  group_by_keys: Object = {};
  group_keys: any[] = [];
  columns: any[] = [];
  show_add_row: Boolean = false;
  current_sorted_column: any = {};
  edit_tracker: Object = {}; // Track Edit options.
  default_configs: Object = {
    expand_class: 'plus',
    collapse_class: 'minus',
    add_class: 'plus',
    edit_class: '',
    delete_class: '',
    save_class: '',
    cancel_class: '',
    data_loading_text: 'Loading...',
    editable: false
  };
  default_column_config: Object = {
    sorted: 0,
    sort_type: null,
    editable: false,
    hidden: false,
    sortable: true
  };

  @Output() expand: EventEmitter<any> = new EventEmitter();
  @Output() collapse: EventEmitter<any> = new EventEmitter();
  @Output() cellclick: EventEmitter<any> = new EventEmitter();
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  @Input()
  data: any[];

  @Input()
  configs: any;

  constructor() {
  }

  ngOnChanges() {
    this.processed_data = [];
    this.group_by_keys = {};
    this.configs = Object.assign({}, this.default_configs, this.configs);

    // If there is no data then do nothing.
    if (!(this.data && this.data.length > 0)) {
      window.console.warn('Data should not be empty!');
      return;
    }

    this.setColumnNames();
    this.groupData(this.data, this.configs.group_by);
  }

  groupData (data, group_by) {
    let index = 0;

    // Make an array of group by key.
    data.forEach(item => {
      // Check if group by key is already an array or not.
      if (!this.group_by_keys[item[group_by]]) {
        this.group_by_keys[item[group_by]] = [];
      }
      this.group_by_keys[item[group_by]].push(item);
      this.edit_tracker[index++] = false;
    });
    const group_keys = Object.keys(this.group_by_keys);
    this.group_keys = group_keys;
    group_keys.forEach(key => {
      this.expand_tracker[key] = 0;
    });

    if (this.current_sorted_column) {
      this.processData(this.current_sorted_column.sort_type, this.current_sorted_column.name);
    } else {
      this.processData(null, null);
    }
  }

  processData(sort_type, sort_by) {
    this.processed_data = [];
    const group_keys = Object.keys(this.group_by_keys);
    const tree_grid = this;
    let index = 0;

    group_keys.forEach(key => {
      const items  = this.group_by_keys[key];

      // Set Parent object.
      tree_grid.processed_data.push({parent_id: key, parent: true, idx: index++});

      // Sort Items
      if (sort_type !== null) {
        sort_type ? items.sort((a, b) => (a[sort_by] > b[sort_by]) ? 1 : ((b[sort_by] > a[sort_by]) ? -1 : 0)) :
        items.sort((a, b) => (a[sort_by] < b[sort_by]) ? 1 : ((b[sort_by] < a[sort_by]) ? -1 : 0));
      }

      // Set Child object.
      items.forEach(item => {
        item.parent = false;
        item.parent_id = key;
        item.idx = index++;
        tree_grid.processed_data.push(item);
      });
    });
  }

  setColumnNames() {
    if (!this.configs.group_by) {
      window.console.error('group_by field is mandatory!');
    }

    this.columns = this.configs.columns ? this.configs.columns : [];

    // If columns doesn't exist in user's object.
    if (!this.configs.columns) {
      const column_keys = Object.keys(this.data[0]);

      // Remove group by key.
      column_keys.splice(column_keys.indexOf(this.configs.group_by), 1);

      // Insert Header and default configuration.
      column_keys.forEach(key => {
        this.columns.push(Object.assign({'header': key}, this.default_column_config));
      });
    } else {

      // Insert Header and default configuration.
      for (let i = 0; i < this.columns.length; i++) {
        this.columns[i] = Object.assign({}, this.default_column_config, this.columns[i]);
      }
    }
  }

  expandRow(id, rec) {
    this.expand_tracker[id] = 1;
    this.expand.emit(rec);
  }

  collapseRow(id, rec) {
    this.expand_tracker[id] = 0;
    this.collapse.emit(rec);
  }

  onCellClick(rec) {
    this.cellclick.emit(rec);
  }

  sortColumn(column) {
    if (!column.sortable) {
      return;
    }
    // If already sorted then reverse.
    column.sort_type = column.sorted ? !column.sort_type : 1;
    column.sorted = 1;

    this.current_sorted_column = column;

    // Sort array.
    this.processData(column.sort_type, column.name);
  }

  enableEdit(index) {
    this.edit_tracker[index] = true;
  }

  saveRecord(index, rec) {
    this.columns.forEach(column => {
      if (column.editable) {
        rec[column.name] = (document.getElementById(index + column.name) as HTMLInputElement).value;
      }
    });
    this.edit_tracker[index] = false;
    this.save.emit(rec);
  }

  cancelEdit(index) {
    this.edit_tracker[index] = false;
  }

  deleteRecord(rec) {
    const r = window.confirm('Are you sure you want to delete this record?');
    if (r === true) {
      this.processed_data.splice(rec.idx, 1);
      this.delete.emit(rec);
    }
  }

  addRow() {
    this.show_add_row = true;
  }

  cancelAddEdit() {
    this.show_add_row = false;
  }

  saveAddRecord() {
    const add_column = {};
    const index = this.processed_data.length;
    this.columns.forEach(column => {
      if (column.editable) {
        add_column[column.name] = (document.getElementById(index + column.name) as HTMLInputElement).value;
      }
    });
    add_column[this.configs.group_by] = (document.getElementById(index + 'group') as HTMLInputElement).value;

    this.data.push(add_column);

    this.group_by_keys = {};
    this.edit_tracker = {};

    this.groupData(this.data, this.configs.group_by);
    this.show_add_row = false;

    this.add.emit(add_column);
  }

}

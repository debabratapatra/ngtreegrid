import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { Column } from './models/Column.model';
import { Configs } from './models/Configs.model';
import { NgtreegridService } from './ngtreegrid.service';
import { Store } from './store/store';

@Component({
  selector: 'db-ngtreegrid',
  templateUrl: './ngtreegrid.component.html',
  styleUrls: ['./ngtreegrid.component.scss']
})
export class NgtreegridComponent implements OnChanges {

  processed_data: any[] = []; // Data after processed for table.
  expand_tracker: Object = {}; // Track Expand or collapse.
  processed_tree_data: Object = {}; // Contains all data by keys.
  group_keys: Object = {}; // Contains all group keys.
  columns: Column[] = []; // Contains all column objects.
  current_sorted_column: any = {}; // Current sorted column object.
  edit_tracker: Object = {}; // Track Edit options.
  internal_configs: any = {
    show_add_row: false
  };
  default_configs: Configs = {
    css: {
      expand_class: 'plus',
      collapse_class: 'minus',
      add_class: 'plus',
      edit_class: '',
      delete_class: '',
      save_class: '',
      cancel_class: '',
      row_selection_class: 'selected',
      header_class: '',
      parent_class: 'parent'
    },
    actions: {
      edit: false,
      add: false,
      delete: false,
      resolve_edit: false,
      resolve_add: false,
      resolve_delete: false
    },
    data_loading_text: 'Loading...',
    group_by: [],
    group_by_header: [],
    action_column_width: '50px',
    group_by_width: [],
    row_class_function: () => true,
    row_edit_function: () => true,
    row_delete_function: () => true,
  };
  default_column_config: Column = {
    sorted: 0,
    sort_type: null,
    editable: false,
    hidden: false,
    sortable: true
  };
  store = new Store(this.ngtreegridService);

  @Output() expand: EventEmitter<any> = new EventEmitter();
  @Output() collapse: EventEmitter<any> = new EventEmitter();
  @Output() cellclick: EventEmitter<any> = new EventEmitter();
  @Output() rowselect: EventEmitter<any> = new EventEmitter();
  @Output() rowadd: EventEmitter<any> = new EventEmitter();
  @Output() rowsave: EventEmitter<any> = new EventEmitter();
  @Output() rowdelete: EventEmitter<any> = new EventEmitter();

  @Input()
  data: any[];

  @Input()
  configs: Configs;

  constructor(private ngtreegridService: NgtreegridService) {
  }

  ngOnChanges() {
    this.setDefaultConfigs();

    // If there is no data then do nothing.
    if (!(this.data && this.data.length > 0)) {
      window.console.warn('Data should not be empty!');
      return;
    }

    this.setColumnNames();
    this.store.groupData(this.data, this.configs.group_by, this);
  }

  setDefaultConfigs() {
    this.processed_data = [];
    this.processed_tree_data = {};
    this.configs = Object.assign({}, this.default_configs, this.configs);

    if (!this.configs.group_by) {
      window.console.error('group_by field is mandatory!');
    } else if (!Array.isArray(this.configs.group_by)) {
      this.configs.group_by = [this.configs.group_by];
    }

    // Set default header for group_by field.
    if (!this.configs.group_by_header) {
      this.configs.group_by_header = this.configs.group_by;
    } else {
      if (!Array.isArray(this.configs.group_by_header)) {
        this.configs.group_by_header = [this.configs.group_by_header];
      }

      if (this.configs.group_by_header.length !== this.configs.group_by.length) {
        this.configs.group_by_header = this.configs.group_by;
      }
    }

    // Set default width for group_by field.
    if (!this.configs.group_by_width) {
      this.configs.group_by_width = this.configs.group_by.map( _ => 'auto');
    } else {
      if (!Array.isArray(this.configs.group_by_width)) {
        this.configs.group_by_width = [this.configs.group_by_width];
      }

      if (this.configs.group_by_width.length !== this.configs.group_by.length) {
        this.configs.group_by_width = this.configs.group_by.map( _ => 'auto');
      }
    }
  }

  setColumnNames() {
    this.columns = this.configs.columns ? this.configs.columns : [];

    // If columns doesn't exist in user's object.
    if (!this.configs.columns) {
      const column_keys = Object.keys(this.data[0]);

      // Remove group by key.
      this.configs.group_by.forEach(key => {
        column_keys.splice(column_keys.indexOf(key), 1);
      });

      // Insert Header and default configuration.
      column_keys.forEach(key => {
        this.columns.push(Object.assign({'header': key, 'name': key}, this.default_column_config));
      });
    } else {

      // Insert Header and default configuration.
      for (let i = 0; i < this.columns.length; i++) {
        this.columns[i] = Object.assign({}, this.default_column_config, this.columns[i]);
      }
    }
  }

  onExpandRow(row) {
    this.expand.emit(row);
  }

  onCollapseRow(rec) {
    this.collapse.emit(rec);
  }

  onRowSelect(row) {
    this.rowselect.emit(row);
  }

  onCellClick(rowCol) {
    this.cellclick.emit(rowCol);
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
    this.store.processData(this, column.sort_type, column.name);
  }

  addRowToGrid() {
    this.processed_tree_data = {};
    this.edit_tracker = {};
    this.store.groupData(this.data, this.configs.group_by, this);
    this.ngtreegridService.showAddRow(false);
  }

  onRowAdd(rec) {
    if (this.configs.actions.resolve_delete) {
      const promise = new Promise((resolve, reject) => {
        this.rowadd.emit({
          data: rec,
          resolve: resolve
        });
      });

      promise.then(() => {
        this.addRowToGrid();
      }).catch((err) => {});
    } else {
      this.addRowToGrid();
      this.rowadd.emit(rec);
    }
  }

  expandAll() {
    this.ngtreegridService.expandAll(this.expand_tracker);
  }

  collapseAll() {
    this.ngtreegridService.collapseAll(this.expand_tracker);
  }

}

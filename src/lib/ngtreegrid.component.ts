import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { Column } from './models/Column.model';
import { Configs } from './models/Configs.model';

@Component({
  selector: 'db-ngtreegrid',
  templateUrl: './ngtreegrid.component.html',
  styleUrls: ['./ngtreegrid.component.scss']
})
export class NgtreegridComponent implements OnChanges {

  processed_data: any[] = []; // Data after processed for table.
  expand_tracker: Object = {}; // Track Expand or collapse.
  group_by_keys: Object = {}; // Contains all data by keys.
  group_keys: Object = {}; // Contains all group keys.
  columns: Column[] = []; // Contains all column objects.
  show_add_row: Boolean = false; // Boolean to show Add Row.
  current_sorted_column: any = {}; // Current sorted column object.
  edit_tracker: Object = {}; // Track Edit options.
  default_configs: Configs = {
    css: {
      expand_class: 'plus',
      collapse_class: 'minus',
      add_class: 'plus',
      edit_class: '',
      delete_class: '',
      save_class: '',
      cancel_class: ''
    },
    actions: {
      edit: false,
      add: false,
      delete: false
    },
    data_loading_text: 'Loading...',
    group_by: [],
    group_by_header: [],
    group_by_width: 'auto'
  };
  default_column_config: Column = {
    sorted: 0,
    sort_type: null,
    editable: false,
    hidden: false,
    sortable: true
  };

  @Output() expand: EventEmitter<any> = new EventEmitter();
  @Output() collapse: EventEmitter<any> = new EventEmitter();
  @Output() cellclick: EventEmitter<any> = new EventEmitter();
  @Output() rowselect: EventEmitter<any> = new EventEmitter();
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  @Input()
  data: any[];

  @Input()
  configs: Configs;

  constructor() {
  }

  ngOnChanges() {
    this.setDefaultConfigs();

    // If there is no data then do nothing.
    if (!(this.data && this.data.length > 0)) {
      window.console.warn('Data should not be empty!');
      return;
    }

    this.setColumnNames();
    this.groupData(this.data, this.configs.group_by);
  }

  setDefaultConfigs() {
    this.processed_data = [];
    this.group_by_keys = {};
    this.configs = Object.assign({}, this.default_configs, this.configs);

    if (!this.configs.group_by) {
      window.console.error('group_by field is mandatory!');
    } else if (!Array.isArray(this.configs.group_by)) {
      this.configs.group_by = [this.configs.group_by];
    }

    if (!this.configs.group_by_header || this.configs.group_by_header.length === 0 ||
      this.configs.group_by_header.length !== this.configs.group_by.length) {
      this.configs.group_by_header = this.configs.group_by;
    }
  }

  /**
   * Find path from root and assgn grouped data
   *
   * @param temp_traversed_paths It is the traversed path for the current group by key.
   * @param index Current index of the leaf node
   * @param group_by_data Generated group by data for the current leaf node
   */
  traverseRootData(temp_traversed_paths: string[], index: number, group_by_data) {
    const paths = temp_traversed_paths[index].split('.');
    let root_keys = this.group_by_keys;

    for (let i = 0; i < paths.length - 1; i++) {
      const path = paths[i];
      root_keys = root_keys[path];
    }

    // Set in last object to keep the reference.
    root_keys[paths[paths.length - 1]] = group_by_data;
  }

  groupData (data, group_by) {

    // It is an array of leaf nodes.
    let last_group_data = [data];

    // It represents the path to the leaf nodes.
    let traversed_paths: string[] = ['data'];
    this.group_by_keys = {'data': ''};

    group_by.forEach(key => {
      const temp_traversed_paths: string[] = [];
      const temp_last_group_data = [];
      let group_keys: string[] = [];

      // Number of records in traversed_paths and last_group_data are same.
      for (let index = 0; index < last_group_data.length; index++) {
        const group_data = last_group_data[index];
        const group_by_data = this.groupByKey(group_data, key);

        this.traverseRootData(traversed_paths, index, group_by_data);

        const new_group_keys = Object.keys(group_by_data);

        const traversed_group_key: string = traversed_paths[index];

        // Get list of grouped data for the current group by in an array.
        new_group_keys.forEach(new_group_key => {

          // Make keys separated by dots for all group by. Example 'data.book.type'
          temp_traversed_paths.push(traversed_group_key + '.' + new_group_key);
          temp_last_group_data.push(group_by_data[new_group_key]);
        });

        group_keys.push(...new_group_keys);
      }

      traversed_paths = temp_traversed_paths;
      last_group_data = temp_last_group_data;

      // Remove duplicates and blanks.
      group_keys = group_keys.filter((item, pos) => {
        return !this.isEmpty(item) && group_keys.indexOf(item) === pos;
      });

      this.group_keys[key] = group_keys;

    });

    if (this.current_sorted_column) {
      this.processData(this.current_sorted_column.sort_type, this.current_sorted_column.name);
    } else {
      this.processData(null, null);
    }
  }

  groupByKey (data, group_by) {
    const group_by_data = {};


    // Make an array of group by key.
    data.forEach(item => {
      // Check if group by key is already an array or not.
      if (!group_by_data[item[group_by]]) {
        group_by_data[item[group_by]] = [];
      }
      group_by_data[item[group_by]].push(item);
    });

    return group_by_data;
  }

  generateData(sort_type, sort_by, tree_grid, group_data, level, parent_key) {
    const group_keys = Object.keys(group_data);

    group_keys.forEach(key => {
      const items  = group_data[key];
      const composite_key = parent_key ? parent_key + '.' + key : key;

      // If items is not an array then it has more group by arrays. So make recursive call.
      if (!Array.isArray(items)) {

        // Create an array of children ids.
        const children = Object.keys(items);
        const children_id = [];
        children.forEach(child => {

          // Add child id to the composite key.
          children_id.push(composite_key + '.' + child);
        });
        tree_grid.processed_data.push({parent_id: parent_key, node_id: composite_key, node_text: key,
          parent: true, last_parent: false, children: children_id, level: level});
        this.expand_tracker[composite_key] = 0;

        // Increase level to mark the level.
        this.generateData(sort_type, sort_by, tree_grid, items, level + 1, composite_key);
      } else {
        // Set Parent object.
        tree_grid.processed_data.push({parent_id: parent_key, node_id: composite_key, node_text: key, 
          parent: true, last_parent: true, level: level});
        this.expand_tracker[composite_key] = 0;

        // Sort Items
        if (sort_type !== null) {
          sort_type ? items.sort((a, b) => (a[sort_by] > b[sort_by]) ? 1 : ((b[sort_by] > a[sort_by]) ? -1 : 0)) :
          items.sort((a, b) => (a[sort_by] < b[sort_by]) ? 1 : ((b[sort_by] < a[sort_by]) ? -1 : 0));
        }

        // Set Child object.
        items.forEach(item => {
          item.parent = false;
          item.parent_id = composite_key;
          tree_grid.processed_data.push(item);
        });
      }
    });
  }

  processData(sort_type, sort_by) {
    this.processed_data = [];
    const tree_grid = this;
    let index = 0;

    // Make recursive call to generate records.
    this.generateData(sort_type, sort_by, tree_grid, this.group_by_keys, 0, null);

    this.processed_data.shift();

    // Add index to all records.
    this.processed_data.forEach(data => {
      data.idx = index++;
      this.edit_tracker[data.idx] = false;
    });

    // Expand root so that first level shows up.
    this.expand_tracker['data'] =  1;

    console.log(this.processed_data);
    console.log(this.expand_tracker);
    console.log(this.group_keys);
    console.log(this.group_by_keys);
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
    this.processData(column.sort_type, column.name);
  }

  onRowSave(index, rec) {
    this.save.emit(rec);
  }

  onRowDelete(rec) {
    this.delete.emit(rec);
  }

  onRowAdd(add_column) {
    this.group_by_keys = {};
    this.edit_tracker = {};
    this.groupData(this.data, this.configs.group_by);
    this.show_add_row = false;
    this.add.emit(add_column);
  }

  isEmpty(value) {
    return value === '' || value === undefined || value === 'undefined';
  }

}

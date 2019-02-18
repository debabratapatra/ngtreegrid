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
  columns: any[] = [];
  default_configs: Object = {
    add_class: 'plus',
    minus_class: 'minus'
  };

  @Output() expand: EventEmitter<any> = new EventEmitter();
  @Output() collapse: EventEmitter<any> = new EventEmitter();
  @Output() cellclick: EventEmitter<any> = new EventEmitter();

  @Input()
  data: any[];

  @Input()
  configs: any;

  constructor() {
  }

  ngOnChanges() {
    this.processed_data = [];
    this.group_by_keys = {};

    // If there is no data then do nothing.
    if (!(this.data && this.data.length > 0)) {
      window.console.error('Data can should not be empty!');
      return;
    }

    this.setColumnNames();
    this.groupData(this.data, this.configs.group_by);
    this.configs = Object.assign({}, this.default_configs, this.configs);
  }

  groupData (data, group_by) {

    // Make an array of group by key.
    data.forEach(item => {
      // Check if group by key is already an array or not.
      if (!this.group_by_keys[item[group_by]]) {
        this.group_by_keys[item[group_by]] = [];
      }
      this.group_by_keys[item[group_by]].push(item);
    });
    const group_keys = Object.keys(this.group_by_keys);

    group_keys.forEach(key => {
      this.expand_tracker[key] = 0;
    });

    this.processData(null, null);
  }

  processData(sort_type, sort_by) {
    this.processed_data = [];
    const group_keys = Object.keys(this.group_by_keys);
    const tree_grid = this;

    group_keys.forEach(key => {
      const items  = this.group_by_keys[key];

      // Set Parent object.
      tree_grid.processed_data.push({parent_id: key, parent: true});

      if (sort_type !== null) {
        sort_type ? items.sort((a, b) => (a[sort_by] > b[sort_by]) ? 1 : ((b[sort_by] > a[sort_by]) ? -1 : 0)) :
        items.sort((a, b) => (a[sort_by] < b[sort_by]) ? 1 : ((b[sort_by] < a[sort_by]) ? -1 : 0));
      }

      // Set Child object.
      items.forEach(item => {
        item.parent = false;
        item.parent_id = key;
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

      // Insert Header and Sort parameters. By Default Sortable is true.
      column_keys.forEach(key => {
        this.columns.push({'header': key, sorted: 0, sort_type: null, sortable: true});
      });
    } else {

      // Insert Sort parameters. By Default Sortable is true.
      this.columns.forEach(column => {
        column.sorted = 0;
        column.sort_type = null;
        column.sortable = column.sortable === false ? false : true;
      });
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

    // Sort array.
    this.processData(column.sort_type, column.name);
  }

}

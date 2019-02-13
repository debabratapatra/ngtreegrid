import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'db-ngtreegrid',
  templateUrl: './ngtreegrid.component.html',
  styleUrls: ['./ngtreegrid.component.scss']
})
export class NgtreegridComponent implements OnChanges {

  processed_data: any[] = [];
  expand_tracker: Object = {};
  total_columns: Number = 0;
  group_by_keys: Object = {};
  columns: any[] = [];
  default_config: Object = {
    add_class: 'plus',
    minus_class: 'minus'
  };

  @Input()
  data: any[];

  @Input()
  config: any;

  constructor() {
  }

  ngOnChanges() {
    this.setColumnNames();
    this.processData(this.data, this.config.group_by);
    this.config = Object.assign({}, this.default_config, this.config);
  }

  processData (data, group_by) {
    const tree_grid = this;

    // Make an array of group by key.
    this.group_by_keys = data.reduce(function(m, d) {

        // Check if group by key is already an array or not
        if (m[group_by] && !Array.isArray(m[group_by])) {
          const temp = {...m};
          m = {};
          m[temp[group_by]] = [];
          m[temp[group_by]].push(temp);
        }

        if (!m[d[group_by]]) {
          m[d[group_by]] = [];
        }
        m[d[group_by]].push({...d});

        return m;
    });

    const group_keys = Object.keys(this.group_by_keys);

    group_keys.forEach(key => {
      const items  = this.group_by_keys[key];
      tree_grid.expand_tracker[key] = 0;

      // Set Parent object.
      tree_grid.processed_data.push({parent_id: key, parent: true});

      // Set Child object.
      items.forEach(item => {
        item.parent = false;
        item.parent_id = key;
        tree_grid.processed_data.push(item);
      });
    });
  }

  setColumnNames() {
    if (!this.config.group_by) {
      window.console.error('group_by field is mandatory!');
    }

    this.columns = this.config.columns ? this.config.columns : [];

    // If columns doesn't exist in user's object.
    if (!this.config.columns) {
      const column_keys = Object.keys(this.data[0]);

      // Remove group by key.
      column_keys.splice(column_keys.indexOf(this.config.group_by), 1);

      column_keys.forEach(key => {
        this.columns.push({'header': key});
      });

      this.total_columns = column_keys.length;
    } else {
      this.total_columns = this.columns.length;
    }
  }

  expandRow(id) {
    this.expand_tracker[id] = 1;
  }

  collapseRow(id) {
    this.expand_tracker[id] = 0;
  }

}

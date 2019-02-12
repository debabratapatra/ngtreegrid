import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'db-ngtreegrid',
  templateUrl: './ngtreegrid.component.html',
  styleUrls: ['./ngtreegrid.component.scss']
})
export class NgtreegridComponent implements OnChanges {

  processed_data: any[] = [];
  expand_tracker: Object = {};
  column_keys: string[] = [];
  columns: Object = {};
  default_config: Object = {
    add_class: 'fa fa-plus',
    minus_class: 'fa fa-minus'
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
    const reduced = data.reduce(function(m, d) {

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

    const group_by_keys = Object.keys(reduced);

    group_by_keys.forEach(key => {
      const items  = reduced[key];
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
    this.columns = this.config.columns ? this.config.columns : {};
    if (this.config.columns) {
      this.column_keys = Object.keys(this.columns);
      return;
    }
    this.columns = {};
    this.column_keys = Object.keys(this.data[0]);

    // Remove group by key.
    this.column_keys.splice(this.column_keys.indexOf(this.config.group_by), 1);

    this.column_keys.forEach(key => {
      this.columns[key] = key;
    });
  }

  expandRow(id) {
    this.expand_tracker[id] = 1;
  }

  collapseRow(id) {
    this.expand_tracker[id] = 0;
  }

}

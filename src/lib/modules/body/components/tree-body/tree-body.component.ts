import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Column } from '../../../../models/Column.model';
import { Configs } from '../../../../models/Configs.model';
import { Store } from '../../../../store/store';

@Component({
  selector: '[db-tree-body]',
  templateUrl: './tree-body.component.html',
  styleUrls: ['./tree-body.component.scss']
})
export class TreeBodyComponent implements OnInit {

  @Input()
  store: Store;

  @Input()
  expand_tracker: Object;

  @Input()
  edit_tracker: Object;

  @Input()
  columns: Column[];

  @Input()
  configs: Configs;

  @Input()
  internal_configs: any;

  @Input()
  rowdelete: EventEmitter<any>;

  @Input()
  rowsave: EventEmitter<any>;

  @Input()
  rowdeselect: EventEmitter<any>;

  @Input()
  cellclick: EventEmitter<any>;

  @Output() rowadd: EventEmitter<any> = new EventEmitter();
  @Output() rowexpand: EventEmitter<any> = new EventEmitter();
  @Output() rowcollapse: EventEmitter<any> = new EventEmitter();
  @Output() rowselect: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  fetchTraversedPaths(traversed_paths) {
    const paths = traversed_paths.split('.');
    let intermediate = this.store.processed_tree_data;

    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      intermediate = intermediate[path];
    }

    return intermediate;
  }

  expandRow(id, row) {
    this.expand_tracker[id] = 1;

    // If children is a parent and its value is empty then expand it automatically.
    row.children && row.children.forEach(child => {
      const ids = child.split('.');
      const last_child = ids[ids.length - 1];

      // If empty!
      if (this.isEmpty(last_child)) {
        this.expand_tracker[child] = 1;
      }
    });

    this.rowexpand.emit(row);
  }

  collapseRow(id, rec) {
    this.expand_tracker[id] = 0;

    // Collapse all of its children.
    const keys = Object.keys(this.expand_tracker);
    keys.forEach(key => {
      if (key.indexOf(id) !== -1) {
        this.expand_tracker[key] = 0;
      }
    });
    this.rowcollapse.emit(rec);
  }

  isEmpty(value) {
    return value === '' || value === undefined || value === 'undefined';
  }

  range(end) {
    const array = [];
    let current = 1;

    while (current < end) {
      array.push(current);
      current += 1;
    }
    return array;
  }

  rowAdd(row) {
    this.rowadd.emit(row);
  }

  saveRecord($event) {
    const rec = $event.data;

    if (this.configs.actions.resolve_edit) {
      const promise = new Promise((resolve, reject) => {
        this.rowsave.emit({
          data: rec,
          resolve: resolve
        });
      });

      promise.then(() => {
        this.edit_tracker[rec['idx']] = false;
      }).catch((err) => {});
    } else {
      this.edit_tracker[rec['idx']] = false;
      this.rowsave.emit(rec);
    }
  }

  cancelEdit(row_data) {
    const index = row_data['idx'];
    this.edit_tracker[index] = false;

    // Cancel all changes ie copy from back up.
    Object.assign(row_data, this.internal_configs.current_edited_row);
  }

  prepareRowClass(data) {
    const row_class = {'child': !data.parent};
    row_class[this.configs.css.parent_class] = data.parent;
    row_class[this.configs.css.row_selection_class] = data.row_selected;
    return row_class;
  }

  selectRow(row_data, event) {
    // Don't run if Multi select is enabled.
    if (this.configs.multi_select) {
      return;
    }

    if (row_data.parent) {
      return;
    }

    this.store.processed_data.forEach(data => {
      data.row_selected = false;
    });
    row_data.row_selected = true;
    this.rowselect.emit({data: row_data, event: event});
  }

  selectRowOnCheck(row_data, event) {
    if (event.target.checked) {
      row_data.row_selected = true;
      this.rowselect.emit({data: row_data, event: event});
    } else {
      row_data.row_selected = false;
      this.rowdeselect.emit({data: row_data, event: event});
    }

    this.setSelectAllConfig();
  }

  /**
   * Set Select All config on Select change.
   *
   */
  setSelectAllConfig() {
    let select_all = true;

    this.store.getDisplayData().forEach(data => {
      if (!data.row_selected) {
        select_all = false;
      }
    });

    this.internal_configs.all_selected = select_all;
  }

}

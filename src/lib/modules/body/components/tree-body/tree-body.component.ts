import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Column } from 'projects/ngtreegrid/src/lib/models/Column.model';
import { Configs } from 'projects/ngtreegrid/src/lib/models/Configs.model';
import { NgtreegridService } from 'projects/ngtreegrid/src/lib/ngtreegrid.service';

@Component({
  selector: '[db-tree-body]',
  templateUrl: './tree-body.component.html',
  styleUrls: ['./tree-body.component.scss']
})
export class TreeBodyComponent implements OnInit {
  show_add_row: boolean;

  @Input()
  processed_group_data: Object;

  @Input()
  expand_tracker: Object;

  @Input()
  edit_tracker: Object;

  @Input()
  data: any;

  @Input()
  processed_data: any;

  @Input()
  columns: Column[];

  @Input()
  configs: Configs;

  @Input()
  group_keys: Object;

  @Output() rowadd: EventEmitter<any> = new EventEmitter();
  @Output() rowsave: EventEmitter<any> = new EventEmitter();
  @Output() rowdelete: EventEmitter<any> = new EventEmitter();
  @Output() rowexpand: EventEmitter<any> = new EventEmitter();
  @Output() rowcollapse: EventEmitter<any> = new EventEmitter();
  @Output() rowselect: EventEmitter<any> = new EventEmitter();
  @Output() cellclick: EventEmitter<any> = new EventEmitter();

  constructor(private ngtreegridService: NgtreegridService) { }

  ngOnInit() {
    this.ngtreegridService.show_add_row$.subscribe(bool => {
      this.show_add_row = bool;
    });
  }

  fetchTraversedPaths(traversed_paths) {
    const paths = traversed_paths.split('.');
    let intermediate = this.processed_group_data;

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
      if (key.includes(id)) {
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

  enableEdit(index) {
    this.edit_tracker[index] = true;
  }

  saveRecord(index, rec) {
    // this.columns.forEach(column => {
    //   if (column.editable) {
    //     rec[column.name] = (document.getElementById(index + column.name) as HTMLInputElement).value;
    //   }
    // });
    this.edit_tracker[index] = false;
    this.rowsave.emit(rec);
  }

  cancelEdit(index) {
    this.edit_tracker[index] = false;
  }

  deleteRecord(rec) {
    const r = window.confirm('Are you sure you want to delete this record?');
    if (r === true) {
      this.processed_data.splice(rec.idx, 1);
      this.rowdelete.emit(rec);
    }
  }

  rowSelect(row) {
    if (row.parent) {
      return;
    }

    this.processed_data.forEach(data => {
      data.row_selected = false;
    });
    row.row_selected = true;
    this.rowselect.emit(row);
  }

  cellClick(rowCol) {
    this.cellclick.emit(rowCol);
  }

  rowAdd(row) {
    this.rowadd.emit(row);
  }

}

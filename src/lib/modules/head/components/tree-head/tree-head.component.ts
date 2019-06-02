import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Column } from '../../../../models/Column.model';
import { Configs } from '../../../../models/Configs.model';
import { Store } from '../../../../Store/Store';

@Component({
  selector: '[db-tree-head]',
  templateUrl: './tree-head.component.html',
  styleUrls: ['./tree-head.component.scss']
})
export class TreeHeadComponent implements OnInit {
  @Input()
  store: Store;

  @Input()
  columns: Column[];

  @Input()
  configs: Configs;

  @Input()
  internal_configs: any;

  @Output() sortcolumn: EventEmitter<any> = new EventEmitter();

  show_add_row: boolean;

  @Input()
  rowselectall: EventEmitter<any>;

  @Input()
  rowdeselectall: EventEmitter<any>;

  constructor() { }

  ngOnInit() {}

  addRow() {
    this.internal_configs.show_add_row = true;
  }

  sortColumn(column) {
    this.sortcolumn.emit(column);
  }

  selectAll(e) {
    if (e.target.checked) {
      this.store.selectAll();
      this.rowselectall.emit(e);
    } else {
      this.store.deSelectAll();
      this.rowdeselectall.emit(e);
    }
  }

}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Column } from '../../../../models/Column.model';
import { Configs } from '../../../../models/Configs.model';

@Component({
  selector: '[db-tree-head]',
  templateUrl: './tree-head.component.html',
  styleUrls: ['./tree-head.component.scss']
})
export class TreeHeadComponent implements OnInit {
  @Input()
  columns: Column[];

  @Input()
  configs: Configs;

  @Input()
  internal_configs: any;

  @Output() sortcolumn: EventEmitter<any> = new EventEmitter();

  show_add_row: boolean;

  constructor() { }

  ngOnInit() {}

  addRow() {
    this.internal_configs.show_add_row = true;
  }

  sortColumn(column) {
    this.sortcolumn.emit(column);
  }

}

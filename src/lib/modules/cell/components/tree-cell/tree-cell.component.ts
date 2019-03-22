import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { Column } from 'projects/ngtreegrid/src/lib/models/Column.model';

@Component({
  selector: 'db-tree-cell',
  templateUrl: './tree-cell.component.html',
  styleUrls: ['./tree-cell.component.css']
})
export class TreeCellComponent implements OnInit {
  @Input()
  cell_value: string;

  @Input()
  row_data: any;

  @Input()
  column: Column;

  @Input()
  edit_on: any;

  @Output() cellclick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onCellClick(rec) {
    this.cellclick.emit(rec);
  }

}

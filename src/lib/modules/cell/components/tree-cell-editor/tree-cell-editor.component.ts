import { Component, OnInit, Input } from '@angular/core';
import { Column } from 'projects/ngtreegrid/src/lib/models/Column.model';

@Component({
  selector: 'db-tree-cell-editor',
  templateUrl: './tree-cell-editor.component.html',
  styleUrls: ['./tree-cell-editor.component.css']
})
export class TreeCellEditorComponent implements OnInit {
  @Input()
  cell_value: string;

  @Input()
  row_data: any;

  @Input()
  column: Column;

  constructor() { }

  ngOnInit() {
  }

  updateRecord(event) {
    this.row_data[this.column.name] = event.target.value;
  }

}

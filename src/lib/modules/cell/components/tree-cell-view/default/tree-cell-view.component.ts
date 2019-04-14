import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'db-tree-cell-view',
  templateUrl: './tree-cell-view.component.html',
  styleUrls: ['./tree-cell-view.component.css']
})
export class TreeCellViewComponent implements OnInit {
  @Input()
  cell_value: string;

  @Input()
  row_data: any;

  @Output() cellclick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}

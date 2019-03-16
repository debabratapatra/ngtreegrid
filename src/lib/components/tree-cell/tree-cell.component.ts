import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}

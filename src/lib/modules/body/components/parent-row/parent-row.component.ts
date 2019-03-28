import { Component, OnInit, Input } from '@angular/core';
import { Column } from 'projects/ngtreegrid/src/lib/models/Column.model';
import { Configs } from 'projects/ngtreegrid/src/lib/models/Configs.model';

@Component({
  selector: '[db-parent-row]',
  templateUrl: './parent-row.component.html',
  styleUrls: ['./parent-row.component.scss']
})
export class ParentRowComponent implements OnInit {


  @Input()
  processed_tree_data: Object;

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

  constructor() { }

  ngOnInit() {
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

}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Column } from 'projects/ngtreegrid/src/lib/models/Column.model';
import { Configs } from 'projects/ngtreegrid/src/lib/models/Configs.model';
import { NgtreegridService } from 'projects/ngtreegrid/src/lib/ngtreegrid.service';

@Component({
  selector: '[db-tree-head]',
  templateUrl: './tree-head.component.html',
  styleUrls: ['./tree-head.component.scss']
})
export class TreeHeadComponent implements OnInit {
  @Input()
  columns: Column[];

  @Input()
  configs: Configs[];

  @Output() sortcolumn: EventEmitter<any> = new EventEmitter();

  show_add_row: boolean;

  constructor(private ngtreegridService: NgtreegridService) { }

  ngOnInit() {
    this.ngtreegridService.show_add_row$.subscribe(bool => {
      this.show_add_row = bool;
    });
  }

  addRow() {
    this.ngtreegridService.showAddRow(true);
  }

  sortColumn(column) {
    this.sortcolumn.emit(column);
  }

}

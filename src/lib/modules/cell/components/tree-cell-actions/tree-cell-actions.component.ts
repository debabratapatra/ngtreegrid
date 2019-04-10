import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Configs } from 'projects/ngtreegrid/src/lib/models/Configs.model';

@Component({
  selector: '[db-tree-cell-actions]',
  templateUrl: './tree-cell-actions.component.html',
  styleUrls: ['./tree-cell-actions.component.scss']
})
export class TreeCellActionsComponent implements OnInit {
  @Input()
  processed_data: any;

  @Input()
  edit_tracker: any;

  @Input()
  configs: Configs;

  @Input()
  data: any;

  @Output() editcomplete: EventEmitter<any> = new EventEmitter();
  @Output() rowdelete: EventEmitter<any> = new EventEmitter();
  @Output() canceledit: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deleteRecord(rec) {
    const r = window.confirm('Are you sure you want to delete this record?');
    if (r === true) {
      this.processed_data.splice(rec.idx, 1);
      this.rowdelete.emit(rec);
    }
  }

  enableEdit(index) {
    this.edit_tracker[index] = true;
  }

  saveRecord($event) {
    this.editcomplete.emit({event: $event, data: this.data});
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Configs } from '../../../../models/Configs.model';
import { Store } from '../../../../store/store';

@Component({
  selector: '[db-tree-cell-actions]',
  templateUrl: './tree-cell-actions.component.html',
  styleUrls: ['./tree-cell-actions.component.scss']
})
export class TreeCellActionsComponent implements OnInit {
  @Input()
  store: Store;

  @Input()
  edit_tracker: any;

  @Input()
  configs: Configs;

  @Input()
  rowdelete: EventEmitter<any>;

  @Input()
  data: any;

  @Input()
  internal_configs: any;

  @Output() editcomplete: EventEmitter<any> = new EventEmitter();
  @Output() canceledit: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  enableEdit(row_data) {
    const index = row_data['idx'];
    this.edit_tracker[index] = true;
    this.internal_configs.current_edited_row = {...row_data};
  }

  findRecordIndex(idx) {
    for (let index = 0; index < this.store.processed_data.length; index++) {
      if (this.store.processed_data[index].idx === idx) {
        return index;
      }
    }
  }

  deleteRecord(rec) {
    if (this.configs.actions.resolve_delete) {
      const promise = new Promise((resolve, reject) => {
        this.rowdelete.emit({
          data: rec,
          resolve: resolve
        });
      });

      promise.then(() => {
        this.store.processed_data.splice(this.findRecordIndex(rec.idx), 1);
        this.store.refreshDisplayData();
      }).catch((err) => {});
    } else {
        this.store.processed_data.splice(this.findRecordIndex(rec.idx), 1);
        this.store.refreshDisplayData();
        this.rowdelete.emit(rec);
    }
  }

  saveRecord($event) {
    this.editcomplete.emit({event: $event, data: this.data});
  }

}

import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { Column } from '../../../../models/Column.model';
import { Configs } from '../../../../models/Configs.model';
import { Store } from '../../../../store/store';

@Component({
  selector: '[db-add-row]',
  templateUrl: './add-row.component.html',
  styleUrls: ['./add-row.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddRowComponent implements OnInit {
  row_data: Object = {};
  show_add_row: boolean;

  @Input()
  store: Store;

  @Input()
  columns: Column[];

  @Input()
  configs: Configs;

  @Input()
  internal_configs: any;

  @Output() rowadd: EventEmitter<any> = new EventEmitter();
  @Output() canceledit: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.columns.forEach(column => {
      this.row_data[column.name] = '';
    });
  }

  saveAddRecord(e) {
    // const add_column = {};
    const index = this.store.processed_data.length;
    // this.columns.forEach(column => {
    //   if (column.editable) {
    //     add_column[column.name] = (document.getElementById(index + column.name) as HTMLInputElement).value;
    //   } else {
    //     add_column[column.name] = '';
    //   }
    // });

    this.configs.group_by.forEach(key => {
      this.row_data[key] = (document.getElementById(index + key) as HTMLInputElement).value;
    });

    this.store.raw_data.push(this.row_data);
    this.internal_configs.show_add_row = false;

    this.rowadd.emit(this.row_data);
  }

  cancelAddEdit() {
    this.internal_configs.show_add_row = false;
  }

}

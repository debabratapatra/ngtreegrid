import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { NgtreegridService } from 'projects/ngtreegrid/src/lib/ngtreegrid.service';
import { Column } from 'projects/ngtreegrid/src/lib/models/Column.model';
import { Configs } from 'projects/ngtreegrid/src/lib/models/Configs.model';

@Component({
  selector: '[db-add-row]',
  templateUrl: './add-row.component.html',
  styleUrls: ['./add-row.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddRowComponent implements OnInit {

  show_add_row: boolean;

  @Input()
  data: any;

  @Input()
  processed_data: any;

  @Input()
  columns: Column[];

  @Input()
  configs: Configs;

  @Input()
  group_keys: Object;

  @Output() rowadd: EventEmitter<any> = new EventEmitter();

  constructor(private ngtreegridService: NgtreegridService) { }

  ngOnInit() {
    this.ngtreegridService.show_add_row$.subscribe(bool => {
      this.show_add_row = bool;
    });
  }

  saveAddRecord() {
    const add_column = {};
    const index = this.processed_data.length;
    this.columns.forEach(column => {
      if (column.editable) {
        add_column[column.name] = (document.getElementById(index + column.name) as HTMLInputElement).value;
      } else {
        add_column[column.name] = '';
      }
    });

    this.configs.group_by.forEach(key => {
      add_column[key] = (document.getElementById(index + key) as HTMLInputElement).value;
    });

    this.data.push(add_column);

    this.rowadd.emit(add_column);
  }

  cancelAddEdit() {
    this.ngtreegridService.showAddRow(false);
  }

}

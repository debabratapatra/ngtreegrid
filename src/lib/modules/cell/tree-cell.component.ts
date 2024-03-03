import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnChanges,
} from "@angular/core";
import { Column } from "../../models/Column.model";

@Component({
  selector: "db-tree-cell",
  templateUrl: "./tree-cell.component.html",
})
export class TreeCellComponent implements OnInit {
  @Input()
  cell_value!: string;

  @Input()
  row_data: any;

  @Input()
  column!: Column | undefined;

  @Input()
  edit_on: any;

  @Input()
  cellclick!: EventEmitter<any>;

  @Output() canceledit: EventEmitter<any> = new EventEmitter();
  @Output() editcomplete: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onCellClick(rec: any, column: Column | undefined) {
    this.cellclick.emit({ row: rec, column: column });
  }

  onEditComplete($event: any) {
    this.editcomplete.emit({ event: $event, data: this.row_data });
  }
}

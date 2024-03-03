import { Component, OnInit, Input } from "@angular/core";
import { Column } from "../../../../../../models/Column.model";
import { DefaultEditor } from "../default-editor.component";

@Component({
  selector: "db-tree-cell-editor",
  templateUrl: "./tree-cell-editor.component.html",
  styleUrls: ["./tree-cell-editor.component.css"],
})
export class TreeCellEditorComponent extends DefaultEditor implements OnInit {
  @Input()
  cell_value!: string;

  @Input()
  row_data: any;

  @Input()
  column!: Column | undefined;

  constructor() {
    super();
  }

  ngOnInit() {}
}

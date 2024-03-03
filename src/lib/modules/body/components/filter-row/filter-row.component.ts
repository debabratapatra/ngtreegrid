import { Component, OnInit, Input } from "@angular/core";
import { Column } from "../../../../models/Column.model";
import { Configs } from "../../../../models/Configs.model";
import { Store } from "../../../../store/store";
import { NgtreegridService } from "../../../../ngtreegrid.service";

@Component({
  selector: "[db-filter-row]",
  templateUrl: "./filter-row.component.html",
  styleUrls: ["./filter-row.component.scss"],
})
export class FilterRowComponent implements OnInit {
  search_values: any = {};

  @Input()
  store!: Store;

  @Input()
  columns!: Column[];

  @Input()
  expand_tracker: any;

  @Input()
  configs!: Configs;

  @Input()
  internal_configs: any;

  constructor(private ngTreeGridService: NgtreegridService) {}

  ngOnInit() {
    this.columns.forEach((column) => {
      this.search_values[column.name] = "";
    });
  }

  filter() {
    this.store.filterBy(
      this.columns.map((column) => column.name),
      Object.values(this.search_values)
    );
    this.ngTreeGridService.expandAll(this.expand_tracker);
  }
}

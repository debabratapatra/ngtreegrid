import { NgtreegridService } from "../ngtreegrid.service";
import { Configs } from "../models/Configs.model";

export class Store {
  processed_data: any[] = [];
  raw_data: any[] = ([] = []);
  display_data: any[] = [];
  configs!: Configs;
  group_keys: any = {}; // Contains all group keys.
  processed_tree_data: Object = {}; // Contains all group keys.

  constructor(private ngTreeGridService: NgtreegridService) {}

  getRawData() {
    return this.raw_data;
  }

  setRawData(raw_data: any) {
    this.raw_data = raw_data;
  }

  getProcessedData(processed_data: any) {
    return this.processed_data;
  }

  setProcessedData(processed_data: any) {
    this.processed_data = processed_data;
    this.setDisplayData([...processed_data]);
  }

  getDisplayData() {
    return this.display_data;
  }

  setDisplayData(display_data: any) {
    this.display_data = display_data;
    this.ngTreeGridService.updateDisplayDataObservable(this.display_data);
  }

  filterBy(fields: any[], search_values: any) {
    this.display_data = this.processed_data.filter((record) => {
      if (record.parent) {
        return true;
      }

      let found = true;
      for (let index = 0; index < fields.length; index++) {
        let field_value = record[fields[index]];
        let search_value = search_values[index];

        // If blank then continue.
        if (!search_value) {
          continue;
        }

        if (typeof field_value === "number") {
          if (field_value !== parseInt(search_value, 10)) {
            found = false;
          }
        } else {
          const column = this.configs.columns[index];
          if (!column.case_sensitive_filter) {
            field_value = field_value.toLowerCase();
            search_value = search_value.toLowerCase();
          }
          if (field_value.indexOf(search_value) === -1) {
            found = false;
          }
        }
      }
      return found;
    });
    this.ngTreeGridService.updateDisplayDataObservable(this.display_data);
  }

  selectAll() {
    this.display_data.forEach((data) => {
      data.row_selected = true;
    });
  }

  deSelectAll() {
    this.display_data.forEach((data) => {
      data.row_selected = false;
    });
  }

  /**
   * Find path from root and assgn grouped data
   *
   * @param temp_traversed_paths It is the traversed path for the current group by key.
   * @param index Current index of the leaf node
   * @param group_by_data Generated group by data for the current leaf node
   */
  traverseRootData(
    temp_traversed_paths: string[],
    index: number,
    group_by_data: any
  ) {
    const paths = temp_traversed_paths[index].split(".");
    let root_keys: any = this.processed_tree_data;

    for (let i = 0; i < paths.length - 1; i++) {
      const path = paths[i];
      root_keys = root_keys[path];
    }

    // Set in last object to keep the reference.
    root_keys[paths[paths.length - 1]] = group_by_data;
  }

  groupData(
    data: any,
    configs: Configs,
    internal_configs: any,
    edit_tracker: any,
    expand_tracker: any
  ) {
    if (configs.sort_by && configs.sort_by.length > 0) {
      data.sort(function (a: any, b: any) {
        var first = a[configs.sort_by!];
        var second = b[configs.sort_by!];
        first = typeof first === "string" ? first.toLowerCase().trim() : first;
        second =
          typeof second === "string" ? second.toLowerCase().trim() : second;
        if (first < second) {
          return -1;
        } else {
          return 1;
        }
      });
    }

    const group_by = configs.group_by;

    // It is an array of leaf nodes.
    let last_group_data = [data];

    // It represents the path to the leaf nodes.
    let traversed_paths: string[] = ["data"];
    this.processed_tree_data = { data: "" };

    group_by.forEach((key) => {
      const temp_traversed_paths: string[] = [];
      const temp_last_group_data: any = [];
      let group_keys: string[] = [];

      // Number of records in traversed_paths and last_group_data are same.
      for (let index = 0; index < last_group_data.length; index++) {
        const group_data = last_group_data[index];
        const group_by_data: any = this.groupByKey(group_data, key);

        this.traverseRootData(traversed_paths, index, group_by_data);

        const new_group_keys = Object.keys(group_by_data);

        const traversed_group_key: string = traversed_paths[index];

        // Get list of grouped data for the current group by in an array.
        new_group_keys.forEach((new_group_key) => {
          // Make keys separated by dots for all group by. Example 'data.book.type'
          temp_traversed_paths.push(traversed_group_key + "." + new_group_key);
          temp_last_group_data.push(group_by_data[new_group_key]);
        });

        group_keys.push(...new_group_keys);
      }

      traversed_paths = temp_traversed_paths;
      last_group_data = temp_last_group_data;

      // Remove duplicates and blanks.
      group_keys = group_keys.filter((item, pos) => {
        return (
          !this.ngTreeGridService.isEmpty(item) &&
          group_keys.indexOf(item) === pos
        );
      });

      this.group_keys[key] = group_keys;
    });

    if (internal_configs.current_sorted_column) {
      this.processData(
        internal_configs.current_sorted_column.sort_type,
        internal_configs.current_sorted_column.name,
        edit_tracker,
        expand_tracker
      );
    } else {
      this.processData(null, null, edit_tracker, expand_tracker);
    }

    this.setRawData(data);
    this.configs = configs;
  }

  groupByKey(data: any, group_by: any) {
    const group_by_data: any = {};

    // Make an array of group by key.
    data.forEach((item: any) => {
      // Check if group by key is already an array or not.
      if (!group_by_data[item[group_by]]) {
        group_by_data[item[group_by]] = [];
      }
      group_by_data[item[group_by]].push(item);
    });

    return group_by_data;
  }

  processData(
    sort_type: any,
    sort_by: any,
    edit_tracker: any,
    expand_tracker: any
  ) {
    this.processed_data = [];
    let index = 0;

    // Make recursive call to generate records.
    this.generateData(
      sort_type,
      sort_by,
      this.processed_tree_data,
      0,
      null,
      expand_tracker
    );

    this.processed_data.shift();

    // Add index to all records.
    this.processed_data.forEach((data) => {
      data.idx = index++;
      edit_tracker[data.idx] = false;
    });

    // Expand root so that first level shows up.
    expand_tracker["data"] = 1;

    this.setProcessedData(this.processed_data);
  }

  generateData(
    sort_type: any,
    sort_by: any,
    group_data: any,
    level: any,
    parent_key: any,
    expand_tracker: any
  ) {
    const group_keys = Object.keys(group_data);

    group_keys.forEach((key) => {
      const items = group_data[key];
      const composite_key = parent_key ? parent_key + "." + key : key;

      // If items is not an array then it has more group by arrays. So make recursive call.
      if (!Array.isArray(items)) {
        // Create an array of children ids.
        const children = Object.keys(items);
        const children_id: any = [];
        children.forEach((child) => {
          // Add child id to the composite key.
          children_id.push(composite_key + "." + child);
        });
        this.processed_data.push({
          parent_id: parent_key,
          node_id: composite_key,
          node_text: key,
          parent: true,
          last_parent: false,
          children: children_id,
          level: level,
        });
        expand_tracker[composite_key] = 0;

        // Increase level to mark the level.
        this.generateData(
          sort_type,
          sort_by,
          items,
          level + 1,
          composite_key,
          expand_tracker
        );
      } else {
        // Set Parent object.
        this.processed_data.push({
          parent_id: parent_key,
          node_id: composite_key,
          node_text: key,
          parent: true,
          last_parent: true,
          level: level,
        });
        expand_tracker[composite_key] = 0;

        // Sort Items
        if (sort_type !== null) {
          sort_type
            ? items.sort((a, b) =>
                a[sort_by] > b[sort_by] ? 1 : b[sort_by] > a[sort_by] ? -1 : 0
              )
            : items.sort((a, b) =>
                a[sort_by] < b[sort_by] ? 1 : b[sort_by] < a[sort_by] ? -1 : 0
              );
        }

        // Set Child object.
        items.forEach((item) => {
          item.parent = false;
          item.parent_id = composite_key;
          this.processed_data.push(item);
        });
      }
    });
  }

  refreshDisplayData() {
    this.display_data = this.processed_data;
    this.ngTreeGridService.updateDisplayDataObservable(this.display_data);
  }
}

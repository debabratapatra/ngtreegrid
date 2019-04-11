import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgtreegridService {
  private show_add_row = new Subject<boolean>();
  show_add_row$ = this.show_add_row.asObservable();

  constructor() { }

  showAddRow(bool: boolean) {
    this.show_add_row.next(bool);
  }

    /**
   * Find path from root and assgn grouped data
   *
   * @param temp_traversed_paths It is the traversed path for the current group by key.
   * @param index Current index of the leaf node
   * @param group_by_data Generated group by data for the current leaf node
   */
  traverseRootData(temp_traversed_paths: string[], index: number, group_by_data, tree_grid) {
    const paths = temp_traversed_paths[index].split('.');
    let root_keys = tree_grid.processed_tree_data;

    for (let i = 0; i < paths.length - 1; i++) {
      const path = paths[i];
      root_keys = root_keys[path];
    }

    // Set in last object to keep the reference.
    root_keys[paths[paths.length - 1]] = group_by_data;
  }

  groupData (data, group_by, tree_grid) {

    // It is an array of leaf nodes.
    let last_group_data = [data];

    // It represents the path to the leaf nodes.
    let traversed_paths: string[] = ['data'];
    tree_grid.processed_tree_data = {'data': ''};

    group_by.forEach(key => {
      const temp_traversed_paths: string[] = [];
      const temp_last_group_data = [];
      let group_keys: string[] = [];

      // Number of records in traversed_paths and last_group_data are same.
      for (let index = 0; index < last_group_data.length; index++) {
        const group_data = last_group_data[index];
        const group_by_data = this.groupByKey(group_data, key);

        this.traverseRootData(traversed_paths, index, group_by_data, tree_grid);

        const new_group_keys = Object.keys(group_by_data);

        const traversed_group_key: string = traversed_paths[index];

        // Get list of grouped data for the current group by in an array.
        new_group_keys.forEach(new_group_key => {

          // Make keys separated by dots for all group by. Example 'data.book.type'
          temp_traversed_paths.push(traversed_group_key + '.' + new_group_key);
          temp_last_group_data.push(group_by_data[new_group_key]);
        });

        group_keys.push(...new_group_keys);
      }

      traversed_paths = temp_traversed_paths;
      last_group_data = temp_last_group_data;

      // Remove duplicates and blanks.
      group_keys = group_keys.filter((item, pos) => {
        return !this.isEmpty(item) && group_keys.indexOf(item) === pos;
      });

      tree_grid.group_keys[key] = group_keys;

    });

    if (tree_grid.current_sorted_column) {
      this.processData(tree_grid, tree_grid.current_sorted_column.sort_type, tree_grid.current_sorted_column.name);
    } else {
      this.processData(tree_grid, null, null);
    }
  }

  groupByKey (data, group_by) {
    const group_by_data = {};

    // Make an array of group by key.
    data.forEach(item => {
      // Check if group by key is already an array or not.
      if (!group_by_data[item[group_by]]) {
        group_by_data[item[group_by]] = [];
      }
      group_by_data[item[group_by]].push(item);
    });

    return group_by_data;
  }

  processData(tree_grid, sort_type, sort_by) {
    tree_grid.processed_data = [];
    let index = 0;

    // Make recursive call to generate records.
    this.generateData(sort_type, sort_by, tree_grid, tree_grid.processed_tree_data, 0, null);

    tree_grid.processed_data.shift();

    // Add index to all records.
    tree_grid.processed_data.forEach(data => {
      data.idx = index++;
      tree_grid.edit_tracker[data.idx] = false;
    });

    // Expand root so that first level shows up.
    tree_grid.expand_tracker['data'] =  1;
  }

  generateData(sort_type, sort_by, tree_grid, group_data, level, parent_key) {
    const group_keys = Object.keys(group_data);

    group_keys.forEach(key => {
      const items  = group_data[key];
      const composite_key = parent_key ? parent_key + '.' + key : key;

      // If items is not an array then it has more group by arrays. So make recursive call.
      if (!Array.isArray(items)) {

        // Create an array of children ids.
        const children = Object.keys(items);
        const children_id = [];
        children.forEach(child => {

          // Add child id to the composite key.
          children_id.push(composite_key + '.' + child);
        });
        tree_grid.processed_data.push({
          parent_id: parent_key,
          node_id: composite_key,
          node_text: key,
          parent: true,
          last_parent: false,
          children: children_id,
          level: level
        });
        tree_grid.expand_tracker[composite_key] = 0;

        // Increase level to mark the level.
        this.generateData(sort_type, sort_by, tree_grid, items, level + 1, composite_key);
      } else {
        // Set Parent object.
        tree_grid.processed_data.push({
            parent_id: parent_key,
            node_id: composite_key,
            node_text: key,
            parent: true,
            last_parent: true,
            level: level
          });
          tree_grid.expand_tracker[composite_key] = 0;

        // Sort Items
        if (sort_type !== null) {
          sort_type ? items.sort((a, b) => (a[sort_by] > b[sort_by]) ? 1 : ((b[sort_by] > a[sort_by]) ? -1 : 0)) :
          items.sort((a, b) => (a[sort_by] < b[sort_by]) ? 1 : ((b[sort_by] < a[sort_by]) ? -1 : 0));
        }

        // Set Child object.
        items.forEach(item => {
          item.parent = false;
          item.parent_id = composite_key;
          tree_grid.processed_data.push(item);
        });
      }
    });
  }

  isEmpty(value) {
    return value === '' || value === undefined || value === 'undefined';
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgtreegridService {
  private show_add_row = new Subject<boolean>();
  show_add_row$ = this.show_add_row.asObservable();
  private display_data_observable = new Subject<any[]>();
  display_data_observable$ = this.display_data_observable.asObservable();

  constructor() { }

  showAddRow(bool: boolean) {
    this.show_add_row.next(bool);
  }

  updateDisplayDataObservable(display_data: any[]) {
    this.display_data_observable.next(display_data);
  }

  isEmpty(value) {
    return value === '' || value === undefined || value === 'undefined';
  }

  expandAll(expand_tracker) {
    for (const key in expand_tracker) {
      if (expand_tracker.hasOwnProperty(key)) {
        expand_tracker[key] = true;
      }
    }
  }

  collapseAll(expand_tracker) {
    for (const key in expand_tracker) {
      if (expand_tracker.hasOwnProperty(key)) {
        expand_tracker[key] = false;
      }
    }
    expand_tracker['data'] = true;
  }
}

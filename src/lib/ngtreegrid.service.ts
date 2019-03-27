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
}

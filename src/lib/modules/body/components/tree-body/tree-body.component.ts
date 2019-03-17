import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'db-tree-body',
  templateUrl: './tree-body.component.html',
  styleUrls: ['./tree-body.component.css']
})
export class TreeBodyComponent implements OnInit {

  @Input()
  data;

  constructor() { }

  ngOnInit() {
  }

}

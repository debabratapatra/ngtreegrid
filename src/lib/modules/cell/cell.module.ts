import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeCellComponent } from './components/tree-cell/tree-cell.component';
import { CustomViewComponent } from './components/tree-cell/custom-tree-cell.component';

@NgModule({
  declarations: [TreeCellComponent, CustomViewComponent],
  imports: [
    CommonModule
  ],
  exports: [TreeCellComponent, CustomViewComponent]
})
export class CellModule { }

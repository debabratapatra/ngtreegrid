import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgtreegridComponent } from './ngtreegrid.component';
import { TreeCellComponent } from './components/tree-cell/tree-cell.component';
import { CustomViewComponent } from './components/tree-cell/custom-tree-cell.component';

@NgModule({
  declarations: [NgtreegridComponent, TreeCellComponent, CustomViewComponent],
  imports: [
    CommonModule
  ],
  exports: [NgtreegridComponent, TreeCellComponent, CustomViewComponent],
  entryComponents: [CustomViewComponent]
})
export class NgtreegridModule { }

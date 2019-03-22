import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeCellComponent } from './components/tree-cell/tree-cell.component';
import { CustomCellViewComponent } from './components/custom-tree-cell.component';
import { CustomCellEditorComponent } from './components/custom-tree-cell-Editor.component';
import { TreeCellEditorComponent } from './components/tree-cell-editor/tree-cell-editor.component';

@NgModule({
  declarations: [TreeCellComponent, CustomCellViewComponent, CustomCellEditorComponent, TreeCellEditorComponent],
  imports: [
    CommonModule
  ],
  exports: [TreeCellComponent, CustomCellViewComponent, CustomCellEditorComponent]
})
export class CellModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeCellComponent } from './components/tree-cell-view/default/tree-cell.component';
import { CustomCellViewComponent } from './components/tree-cell-view/custom/custom-tree-cell.component';
import { CustomCellEditorComponent } from './components/tree-cell-editor/custom/custom-tree-cell-Editor.component';
import { TreeCellEditorComponent } from './components/tree-cell-editor/default/cell-editor/tree-cell-editor.component';
import { TreeCellActionsComponent } from './components/tree-cell-actions/tree-cell-actions.component';

@NgModule({
  declarations: [
    TreeCellComponent,
    CustomCellViewComponent,
    CustomCellEditorComponent,
    TreeCellEditorComponent,
    TreeCellActionsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [TreeCellComponent, CustomCellViewComponent, CustomCellEditorComponent, TreeCellActionsComponent]
})
export class CellModule { }

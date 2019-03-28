import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeBodyComponent } from './components/tree-body/tree-body.component';
import { CellModule } from '../cell/cell.module';
import { AddRowComponent } from './components/add-row/add-row.component';

@NgModule({
  declarations: [TreeBodyComponent, AddRowComponent],
  imports: [
    CommonModule,
    CellModule,
  ],
  exports: [TreeBodyComponent, AddRowComponent]
})
export class BodyModule { }

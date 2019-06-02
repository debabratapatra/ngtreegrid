import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeBodyComponent } from './components/tree-body/tree-body.component';
import { CellModule } from '../cell/cell.module';
import { AddRowComponent } from './components/add-row/add-row.component';
import { FilterRowComponent } from './components/filter-row/filter-row.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TreeBodyComponent, AddRowComponent, FilterRowComponent],
  imports: [
    CommonModule,
    CellModule,
    FormsModule
  ],
  exports: [TreeBodyComponent, AddRowComponent]
})
export class BodyModule { }

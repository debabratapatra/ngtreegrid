import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeBodyComponent } from './components/tree-body/tree-body.component';
import { CellModule } from '../cell/cell.module';

@NgModule({
  declarations: [TreeBodyComponent],
  imports: [
    CommonModule,
    CellModule,
  ],
  exports: [TreeBodyComponent]
})
export class BodyModule { }

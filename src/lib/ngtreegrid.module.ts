import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgtreegridComponent } from './ngtreegrid.component';
import { CellModule } from './modules/cell/cell.module';

@NgModule({
  declarations: [NgtreegridComponent],
  imports: [
    CommonModule,
    CellModule
  ],
  exports: [NgtreegridComponent]
})
export class NgtreegridModule { }

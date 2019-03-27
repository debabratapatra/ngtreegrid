import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeHeadComponent } from './components/tree-head/tree-head.component';

@NgModule({
  declarations: [TreeHeadComponent],
  imports: [
    CommonModule
  ],
  exports: [TreeHeadComponent]
})
export class HeadModule { }

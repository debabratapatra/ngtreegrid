import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgtreegridComponent } from './ngtreegrid.component';
import { BodyModule } from './modules/body/body.module';
import { HeadModule } from './modules/head/head.module';

@NgModule({
  declarations: [NgtreegridComponent],
  imports: [
    CommonModule,
    BodyModule,
    HeadModule
  ],
  exports: [NgtreegridComponent]
})
export class NgtreegridModule { }

export {DefaultEditor} from './modules/cell/components/tree-cell-editor/default/default-editor.component';

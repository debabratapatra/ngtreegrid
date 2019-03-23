import {
    Component,
    Input,
    ComponentFactoryResolver,
    ViewChild,
    ViewContainerRef,
    OnInit,
    OnDestroy,
} from '@angular/core';
import { Column } from 'projects/ngtreegrid/src/lib/models/Column.model';

@Component({
    selector: 'db-custom-cell-editor-component',
    template: `
      <ng-template #dynamicTarget></ng-template>
    `,
})
export class CustomCellEditorComponent implements OnInit, OnDestroy {
    customComponent: any;
    @Input() column: Column;
    @Input() cell_value;
    @Input() row_data;
    @ViewChild('dynamicTarget', { read: ViewContainerRef }) dynamicTarget: any;

    constructor(private resolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
      if (this.column.edit_component && !this.customComponent) {
        this.createCustomComponent();
        this.callOnComponentInit();
      }
    }

    ngOnDestroy() {
      if (this.customComponent) {
        this.customComponent.destroy();
      }
    }

    protected createCustomComponent() {
      const componentFactory = this.resolver.resolveComponentFactory(this.column.edit_component);
      this.customComponent = this.dynamicTarget.createComponent(componentFactory);
    }

    protected callOnComponentInit() {
      this.column.onComponentInit && this.column.onComponentInit(this.customComponent.instance);

      this.customComponent.instance.cell_value = this.cell_value;
      this.customComponent.instance.row_data = this.row_data;
      this.customComponent.instance.column = this.column;
    }
}
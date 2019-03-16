import {
    Component,
    Input,
    ComponentFactoryResolver,
    ViewChild,
    ViewContainerRef,
    OnInit,
    OnDestroy,
} from '@angular/core';

@Component({
    selector: 'db-custom-cell-component',
    template: `
      <ng-template #dynamicTarget></ng-template>
    `,
})
export class CustomViewComponent implements OnInit, OnDestroy {
    customComponent: any;
    @Input() cell;
    @Input() cell_value;
    @Input() row_data;
    @ViewChild('dynamicTarget', { read: ViewContainerRef }) dynamicTarget: any;

    constructor(private resolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
      if (this.cell && !this.customComponent) {
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
      const componentFactory = this.resolver.resolveComponentFactory(this.cell.renderComponent);
      this.customComponent = this.dynamicTarget.createComponent(componentFactory);
    }

    protected callOnComponentInit() {
      const onComponentInitFunction = this.cell.getColumn().getOnComponentInitFunction();
      onComponentInitFunction && onComponentInitFunction(this.customComponent.instance);
      this.customComponent.instance.cell_value = this.cell_value;
      this.customComponent.instance.row_data = this.row_data;
    }
}

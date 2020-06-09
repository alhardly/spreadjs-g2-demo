import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[dynamic-host]',
})
export class DynamicDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}

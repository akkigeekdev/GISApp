import { Directive, ViewContainerRef, Type, Component } from '@angular/core';

export class PropertyItem {
    constructor(public component: Type<any>) {}
}



@Directive({
  selector: '[properties]'
})
export class PropertyDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

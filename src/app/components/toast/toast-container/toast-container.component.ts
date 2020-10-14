import {Component, TemplateRef, ViewEncapsulation} from '@angular/core';
import {ToastService}                              from '../../../services/toast.service';

@Component({
    selector     : '.toasts',
    templateUrl  : './toast-container.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ToastContainerComponent {
    constructor(public toastService: ToastService) {
    }

    isTemplate(toast) {
        return toast.textOrTpl instanceof TemplateRef;
    }
}

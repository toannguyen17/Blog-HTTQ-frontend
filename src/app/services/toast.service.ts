import {Injectable, TemplateRef} from '@angular/core';
import {ToastOptions}            from '../components/toast/toast-container/toast-options';

@Injectable({providedIn: 'root'})
export class ToastService {
    toasts: ToastOptions[] = [];

    show(textOrTpl: string | TemplateRef<any>, options: ToastOptions = {}) {
        this.toasts.push({textOrTpl, ...options});
    }

    remove(toast) {
        this.toasts = this.toasts.filter(t => t !== toast);
    }
}

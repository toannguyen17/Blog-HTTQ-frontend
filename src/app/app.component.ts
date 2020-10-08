import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector     : 'app-root',
    templateUrl  : './app.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    title = 'Blog-HTTQ-frontend';
    today = new Date().getHours();
}

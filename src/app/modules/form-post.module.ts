import {NgModule}             from '@angular/core';
import {CommonModule}         from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PostFormComponent}    from '../components/post-form/post-form.component';
import {CKEditorModule}                   from '@ckeditor/ckeditor5-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
    {path: '', component: PostFormComponent},
];

@NgModule({
    declarations: [
        PostFormComponent
    ],
    imports: [
        CommonModule,
        CKEditorModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
    ],
    exports     : [RouterModule]
})
export class FormPostModule {
}

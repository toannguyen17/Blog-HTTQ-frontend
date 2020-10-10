import {NgModule}             from '@angular/core';
import {CommonModule}         from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PostFormComponent}    from '../components/post-form/post-form.component';
import {CKEditorModule}       from '@ckeditor/ckeditor5-angular';
import {ReactiveFormsModule}  from '@angular/forms';
import {PostEditComponent}    from '../components/post-edit/post-edit.component';

const routes: Routes = [
    {
        path: '',
        component: PostFormComponent
    },
    {
        path: 'edit/:seo',
        component: PostEditComponent
    },
];

@NgModule({
    declarations: [
        PostFormComponent,
        PostEditComponent
    ],
    imports     : [
        CommonModule,
        CKEditorModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
    ],
    exports     : [RouterModule]
})
export class FormPostModule {
}

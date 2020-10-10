import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import * as ClassicEditor                   from '@ckeditor/ckeditor5-build-balloon-block';
import {CKEditorComponent}                  from '@ckeditor/ckeditor5-angular';
import {Router}                             from '@angular/router';
import {PostService}                        from '../../services/post.service';
import {Post}                               from '../../models/post';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector     : 'app-post',
    templateUrl  : './post-form.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PostFormComponent implements OnInit {
    @ViewChild('ckEditorComponent')
    editorComponent: CKEditorComponent;

    public Editor = ClassicEditor;

    public form: FormGroup;

    public seo: string;

    public config = {
        toolbar: ['heading', '|', 'bold', 'italic', 'link', '|', 'bulletedList', 'numberedList', '|', 'indent', 'outdent', '|', 'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed', '|', 'undo', 'redo'],
        block  : ['heading', 'bulletedList', 'numberedList', '|', 'indent', 'outdent', '|', 'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed', '|', 'undo', 'redo']
    };

    constructor(
        private router: Router,
        private postService: PostService,
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        console.log(this);
        this.form = this.formBuilder.group({
            title   : ['', [Validators.required]],
            subTitle: ['', [Validators.required]],
            status  : ['PUBLIC', [Validators.required]],
            content : ['', [Validators.required]],
        });
    }

    getEditor() {
        return this.editorComponent.editorInstance;
    }

    onSubmit() {
        if (this.form.valid) {
            let post = {
                ...this.form.value,
                contentPlainText: this.getEditor().sourceElement.textContent,
                tags            : []
            };

            if(this.seo !== void 0){
                post.seo = this.seo;
                this.postService.update(post).subscribe();
            }else{
                this.postService.save(post).subscribe();
            }

            console.log(post);
        }
    }
}

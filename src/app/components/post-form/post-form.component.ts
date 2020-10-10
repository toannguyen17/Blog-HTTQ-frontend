import {Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';

import * as ClassicEditor                   from '@ckeditor/ckeditor5-build-balloon-block';
import {CKEditorComponent}                  from '@ckeditor/ckeditor5-angular';
import {Router}                             from '@angular/router';
import {PostService}                        from '../../services/post.service';
import {Post}                               from '../../models/post';
import {Tag}                                from '../../models/tag';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector     : 'app-post',
    templateUrl  : './post-form.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PostFormComponent implements OnInit {
    public Editor = ClassicEditor;

    public form: FormGroup;

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

    onSubmit() {
        if (this.form.valid) {
            let post = {
                ...this.form.value,
                tags: []
            } as Post;

            console.log(post);

            this.postService.save(post).subscribe();
        }
    }
}

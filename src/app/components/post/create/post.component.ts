import {Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';

import * as ClassicEditor  from '@ckeditor/ckeditor5-build-balloon-block';
import {CKEditorComponent} from '@ckeditor/ckeditor5-angular';
import {Router}            from '@angular/router';
import {PostService}       from '../../../services/post.service';
import {Post}              from '../../../models/post';
import {Tag}               from '../../../models/tag';

@Component({
    selector     : 'app-post',
    templateUrl  : './post.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit {

    @ViewChild('ckEditorComponent')
    editorComponent: CKEditorComponent;

    Editor = ClassicEditor;

    title: string    = '';
    subTitle: string = '';
    content: string  = '';
    status: string   = 'PUBLIC';

    config = {
        toolbar: ['heading', '|', 'bold', 'italic', 'link'],
        block  : ['heading', '|', 'bulletedList', 'numberedList', '|', 'indent', 'outdent', '|', 'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed', '|', 'undo', 'redo']
    };

    constructor(
        private router: Router,
        private postService: PostService
    ) {
    }

    ngOnInit(): void {
        console.log(this);
    }

    public getEditor() {
        // Warning: This may return "undefined" if the editor is hidden behind the `*ngIf` directive or
        // if the editor is not fully initialised yet.
        return this.editorComponent.editorInstance;
    }

    save() {
        let post = {
            title           : this.title,
            subTitle        : this.subTitle,
            content         : this.content,
            contentPlainText: this.getEditor().sourceElement.innerText,
            status          : this.status,
            tags            : []
        } as Post;

        console.log(post);

        this.postService.save(post).subscribe();

    }
}

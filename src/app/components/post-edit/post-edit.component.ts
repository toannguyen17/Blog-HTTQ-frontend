import {Component, DoCheck, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {PostFormComponent}      from '../post-form/post-form.component';
import {PostService}            from '../../services/post.service';

declare let $: any;

@Component({
    selector     : '.app-edit',
    templateUrl  : './post-edit.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PostEditComponent implements OnInit, DoCheck {
    @ViewChild('formComponent')
    formComponent: PostFormComponent;

    private seo: string;

    private data: any;

    public renderForm: boolean = false;

    constructor(
        private router: Router,
        private postService: PostService,
        private activeRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        if (this.activeRoute.snapshot.params.seo !== void 0){
            this.seo = this.activeRoute.snapshot.params.seo;
            this.postService.findBySeo(this.seo).subscribe(response => {
                console.log(response);
                if (response.status === 0){
                    this.data = response.data;
                    this.renderForm = true;
                }
            });
        }
        console.log(this);
    }

    ngDoCheck() {
        if (this.formComponent !== void 0 && this.data !== void 0) {
            this.formComponent.seo = this.seo;

            this.formComponent.form.patchValue({
                title   : this.data.title,
                subTitle: this.data.subTitle,
                status  : this.data.status,
                content : this.data.content,
            });

            this.data.tags.forEach((tag)=>{
                console.log(tag.tag);
                $(this.formComponent.inputTags.nativeElement).tagEditor('addTag', tag.tag);
            })

            this.data = void 0;
        }
    }
}

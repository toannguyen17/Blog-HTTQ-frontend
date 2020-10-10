import {
    AfterContentInit,
    AfterViewInit,
    Component,
    DoCheck,
    ElementRef, OnChanges,
    OnInit, SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {PostService}            from '../../services/post.service';

@Component({
    selector     : '.post-view',
    templateUrl  : './post-view.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PostViewComponent implements OnInit, DoCheck {

    @ViewChild("title")
    title: ElementRef;

    @ViewChild("subTitle")
    subTitle: ElementRef;

    @ViewChild("content")
    content: ElementRef;


    post: any;

    public showSubTitle: boolean = false;

    private seo: string;

    constructor(
        private router: Router,
        private postService: PostService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.seo = this.activatedRoute.snapshot.params.seo;
        console.log("ngOnInit", this.subTitle);
        this.postService.findBySeo(this.seo).subscribe(response => {
            this.post = response.data;
            this.title.nativeElement.innerText = this.post.title;

            this.content.nativeElement.innerHTML = this.post.content;

            if (response.data.subTitle.trim().length > 0){
                this.showSubTitle = true;
            }
        });
        console.log(this);
    }

    ngDoCheck() {
        if (this.subTitle !== void 0){
            this.subTitle.nativeElement.innerText = this.post.subTitle;
        }
    }
}

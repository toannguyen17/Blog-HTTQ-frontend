import {
    AfterContentChecked,
    AfterContentInit, AfterViewChecked,
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
import {AuthenticationService}  from '../../services/authentication.service';

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

    public seo: string;

    constructor(
        private router: Router,
        private postService: PostService,
        private activatedRoute: ActivatedRoute,
        public auth: AuthenticationService
    ) {
    }

    ngOnInit(): void {
        this.getContent();
        console.log("ngOnInit", this.subTitle);
    }

    ngDoCheck() {
        if (this.seo != this.activatedRoute.snapshot.params.seo)
            this.getContent();

        // console.log('ngDoCheck', this);
        if (this.subTitle !== void 0){
            this.subTitle.nativeElement.innerText = this.post.subTitle;
        }
    }

    getContent(){
        this.seo = this.activatedRoute.snapshot.params.seo;
        this.postService.findBySeo(this.seo).subscribe(response => {
            this.post = response.data;
            this.title.nativeElement.innerText = this.post.title;

            this.content.nativeElement.innerHTML = this.post.content;

            if (response.data.subTitle.trim().length > 0){
                this.showSubTitle = true;
            }
        });
    }

    deletePost(){
        if(confirm("Delete Post ??!")){
            this.postService.deleteBySeo(this.seo).subscribe(response => {
                this.router.navigateByUrl('/');
            });
        }
    }
}

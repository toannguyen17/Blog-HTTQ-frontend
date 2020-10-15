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

import {ActivatedRoute, Router}             from '@angular/router';
import {PostService}                        from '../../services/post.service';
import {AuthenticationService}              from '../../services/authentication.service';
import {Tag}                                from '../../models/tag';
import {UserRole}                           from '../../models/user-role';
import {Post}                               from '../../models/post';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastService}                       from '../../services/toast.service';

@Component({
    selector     : '.post-view',
    templateUrl  : './post-view.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PostViewComponent implements OnInit, DoCheck {

    post: Post;

    tags: Tag[];

    public showSubTitle: boolean = false;

    public seo: string;

    avatarUrl: string;
    authName: string;

    public control: boolean = false;

    public err404: boolean = false;
    public render: boolean = false;

    formComment: FormGroup;

    constructor(
        private router: Router,
        private postService: PostService,
        private activatedRoute: ActivatedRoute,
        public auth: AuthenticationService,
        private formBuilder: FormBuilder,
        private toast: ToastService
    ) {
    }

    ngOnInit(): void {
        this.getContent();
        this.formComment = this.formBuilder.group({
            comment: ['', [Validators.required]]
        });
    }

    ngDoCheck() {
        if (this.seo != this.activatedRoute.snapshot.params.seo) {
            this.getContent();
        }
    }

    getContent() {
        this.seo = this.activatedRoute.snapshot.params.seo;
        this.postService.findBySeo(this.seo).subscribe(response => {
            if (response.status === 0) {
                this.render = true;
                this.err404 = false;

                this.post                          = response.data;
                this.tags                          = this.post.tags;
                if (response.data.subTitle.trim().length > 0) {
                    this.showSubTitle = true;
                }

                let user = this.auth.user;
                if (this.auth.user != null &&
                    ((this.post.auth != null && this.post.auth.id == user.id) ||
                        user.roles.filter(role => role == UserRole.ROLE_ADMIN).length > 0)
                ) {
                    this.control = true;
                } else {
                    this.control = false;
                }
            } else {
                this.render = false;
                this.err404 = true;
            }
        });
    }

    deletePost() {
        if (confirm('Delete Post ??!')) {
            this.postService.deleteBySeo(this.seo).subscribe(response => {
                this.toast.show('Delete ');
                this.router.navigateByUrl('/');
            });
        }
    }

    onSubmitComment(){
        if (this.formComment.valid){

        }
    }
}

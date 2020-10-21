import {
    Component,
    DoCheck, ElementRef,
    OnInit, ViewChild,
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
import {CommentService}                     from '../../services/comment.service';
import {CommentPage}                        from '../../models/commentPage';
import {Comment}                            from '../../models/comment';
import {Title}                              from '@angular/platform-browser';

@Component({
    selector     : '.post-view',
    templateUrl  : './post-view.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PostViewComponent implements OnInit, DoCheck {

    @ViewChild('content')
    content: ElementRef;

    post: Post;

    tags: Tag[];

    public showSubTitle: boolean = false;

    public seo: string;

    avatarUrl: string;
    authName: string;

    public control: boolean = false;

    public err404: boolean = false;
    public render: boolean = false;

    private page: number = 1;

    commentPage: CommentPage;
    comments: Comment[] = [];

    formComment: FormGroup;

    constructor(
        private router: Router,
        private postService: PostService,
        private activatedRoute: ActivatedRoute,
        public auth: AuthenticationService,
        private formBuilder: FormBuilder,
        private toast: ToastService,
        private commentService: CommentService,
        private title: Title
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
        if (this.content && this.post){
            this.content.nativeElement.innerHTML = this.post.content;
        }
    }

    getContent() {
        this.page = 1;
        this.comments = [];
        this.seo  = this.activatedRoute.snapshot.params.seo;
        this.postService.findBySeo(this.seo).subscribe(response => {
            console.log(response);
            if (response.status === 0) {
                this.render = true;
                this.err404 = false;

                this.post = response.data;
                this.title.setTitle(this.post.title + ' - Blog HTTQ' );
                this.tags = this.post.tags;
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

                this.getComment();
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

    getComment() {
        let form = {
            id  : this.post.id,
            page: this.page
        };

        this.commentService.getComment(form).subscribe(response => {
            if (response.status === 0) {
                this.commentPage = response.data;

                this.commentPage.comments.forEach(comment => {
                    this.comments.push(comment);
                })
                console.log(response.data);
            }
        });
    }

    onSubmitComment() {
        console.log(this.formComment.value);
        if (this.formComment.valid) {
            let form = {
                post   : this.post.id,
                comment: this.formComment.value.comment
            };
            console.log(form);
            this.commentService.save(form).subscribe(response => {
                if (response.status === 0){
                    this.comments.unshift(response.data);
                }
            });
            this.formComment.patchValue({
                comment: ''
            });
        } else {
        }
    }
}

import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Comment}                                     from '../../models/comment';

@Component({
    selector     : '.comment',
    templateUrl  : './comment.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CommentComponent implements OnInit {

    @Input()
    public data: Comment;

    constructor() {
    }

    ngOnInit(): void {
    }

}

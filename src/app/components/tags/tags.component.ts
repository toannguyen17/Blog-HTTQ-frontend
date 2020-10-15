import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router}               from '@angular/router';
import {TagService}                           from '../../services/tag.service';
import {PostPageable}                         from '../../models/post-pageable';

@Component({
    selector     : 'app-tags',
    templateUrl  : './tags.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TagsComponent implements OnInit {

    tags: string[] = [];

    page: number = 1;

    postPageable: PostPageable;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private tagService: TagService
    ) {
    }

    ngOnInit(): void {
        let query_tag = this.activatedRoute.snapshot.queryParams.t;
        if(typeof query_tag === 'string'){
            this.tags.push(query_tag);
        }else{
            this.tags = [...query_tag];
        }
        this.search();
    }

    pageChange(event) {
        console.log(this.page, event);
        this.page = event;
        this.search();
    }

    search() {
        this.tagService.findPostByTagList(this.tags, this.page).subscribe(response => {
            this.postPageable = response.data;
            console.log(this.postPageable);
        });
    }
}

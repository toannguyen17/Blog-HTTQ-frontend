import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HomeService}                          from '../../services/home.service';
import {ReViewPost}                           from '../../models/reViewPost';
import {Title}                                from '@angular/platform-browser';

@Component({
    selector     : 'app-home',
    templateUrl  : './home.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

    topTrend: ReViewPost[] = new Array<ReViewPost>();
    lastPost: ReViewPost[] = new Array<ReViewPost>();

    constructor(
        private homeService: HomeService,
        private title: Title
    ) {
    }

    ngOnInit(): void {
        this.title.setTitle('Blog HTTQ');
        this.homeService.get().subscribe(response => {
            this.topTrend = response.data.topTrend;
            this.lastPost = response.data.lastPost;
        });
    }

}

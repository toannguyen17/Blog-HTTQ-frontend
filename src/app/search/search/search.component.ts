import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SearchService}                        from '../search.service';
import {ActivatedRoute, Router}               from '@angular/router';
import {ISearchResult}                        from '../isearch-result';

@Component({
               selector: 'app-search',
               templateUrl: './search.component.html',
               styleUrls: ['./search.component.scss'],
               encapsulation: ViewEncapsulation.None
           })
export class SearchComponent implements OnInit {
    results: ISearchResult[] = [];
    key: string = '';

    constructor(private searchService: SearchService) {
    }

    ngOnInit(): void {
    }

    public search(): void {
        this.searchService.search(this.key).subscribe(r => {
            this.results = r.data;
        });
    }

}

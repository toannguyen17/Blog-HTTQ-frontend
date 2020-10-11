import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { environment } from 'src/environments/environment';
import {ISeek}                                from '../../interface/iseek';
import {SeekService}                          from '../../service/seek.service';

@Component({
               selector: 'app-seek',
               templateUrl: './seek.component.html',
               styleUrls: ['./seek.component.scss'],
               encapsulation: ViewEncapsulation.None
           })
export class SeekComponent implements OnInit {
    results: ISeek[] = [];
    key: string = '';
    showResult = false;

    constructor(private seekService: SeekService) {
    }

    ngOnInit(): void {
    }

    public inputFocusOut() {
        this.showResult = false;
    }

    public search(): void {
        if (this.key.trim().length > 0) {
            this.showResult = true;
            this.seekService.search(this.key).subscribe(r => {
                this.results = r.data;
                for (let i of this.results) {
                    console.log(i);
                    switch (i.type) {
                        case 'POST':
                            i.url = `/post/${i.referenceId}`;
                            break;
                        case 'USER':
                            i.url = `/user/${i.referenceId}`;
                            break;
                        default:
                            break;
                    }
                }
            });
        }
    }

}

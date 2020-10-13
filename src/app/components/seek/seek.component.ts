import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {environment}                          from 'src/environments/environment';
import {ISeek}                                from '../../interface/iseek';
import {SeekService}                          from '../../service/seek.service';
import {Router}                               from '@angular/router';

@Component({
    selector     : 'app-seek',
    templateUrl  : './seek.component.html',
    encapsulation: ViewEncapsulation.None
})
export class SeekComponent implements OnInit {
    s: any;

    results: ISeek[] = [];
    key: string      = '';
    showResult       = false;

    constructor(private seekService: SeekService, private router: Router) {
    }

    ngOnInit(): void {
    }

    public inputFocusOut() {
        clearTimeout(this.s);
        this.s = setTimeout(() => {
            this.showResult = false;
        }, 300);
    }

    public search(): void {
        if (this.key.trim().length > 0) {
            this.showResult = true;
            this.seekService.search(this.key).subscribe(r => {
                this.results = r.data;
                // for (let i of this.results) {
                //     console.log(i);
                //     switch (i.type) {
                //         case 'POST':
                //             i.url = `/${i.referenceId}`;
                //             break;
                //         case 'USER':
                //             i.url = `/user/${i.referenceId}`;
                //             break;
                //         default:
                //             break;
                //     }
                // }
            });
        }else {
            this.showResult = false;
        }
    }

    redirect(url: string): void {
        console.log(url)
        this.router.navigateByUrl(url)
    }

}

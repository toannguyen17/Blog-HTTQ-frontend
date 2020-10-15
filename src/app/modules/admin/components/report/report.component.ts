import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ReportService} from '../../service/report.service';
import {Report} from '../../interface/report';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ReportComponent implements OnInit {
    report: Report = {};

    constructor(private reportService: ReportService) {
        this.reportService.getReport().subscribe(rs => {
            this.report = rs.data;
           this.barChartData = [{data: [this.report.numberOfPostLast7Days,this.report.numberOfPostLast30Days], label: 'Posts'}]
        });
    }

    public barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels = ['Last 7 days','Last 30 days'];
    public barChartType = 'bar';
    public barChartLegend = true;
    public barChartData = [{data: [this.report.numberOfPostLast7Days,this.report.numberOfPostLast30Days], label: 'Posts'}];

    ngOnInit(): void {
    }

}

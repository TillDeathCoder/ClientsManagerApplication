import {Component, OnInit} from '@angular/core';
import * as CanvasJS from 'libs/canvasjs/canvasjs.min';
import {StatisticYearBuilder} from '../../../utils/builder/statistic-year.builder';

@Component({
    selector: 'rp-statistic-year',
    templateUrl: './statistic-year.component.html',
    styleUrls: ['./statistic-year.component.scss']
})
export class StatisticYearComponent implements OnInit {

    constructor(private infoBuilder: StatisticYearBuilder) {
    }

    async ngOnInit() {
        const info = await this.infoBuilder.build('2019');
        const chart = new CanvasJS.Chart('chartContainer', {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: 'Статистика за год'
            },
            data: [{
                type: 'column',
                dataPoints: info
            }]
        });

        chart.render();
    }

}

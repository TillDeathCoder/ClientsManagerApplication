import {Component, OnInit} from '@angular/core';
import * as CanvasJS from 'libs/canvasjs/canvasjs.min';
import {StatisticYearBuilder} from '../../../utils/builder/statistic-year.builder';
import * as moment from 'moment';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'rp-statistic-year',
    templateUrl: './statistic-year.component.html',
    styleUrls: ['./statistic-year.component.scss']
})
export class StatisticYearComponent implements OnInit {

    START_YEAR = 2019;
    currentYear = moment(new Date()).year();
    yearControl: FormControl;
    showWarning = false;

    constructor(private infoBuilder: StatisticYearBuilder) {
    }

    ngOnInit() {
        this.currentYear = this.START_YEAR;
        this.yearControl = new FormControl(this.currentYear, [], async (control: FormControl) => {
            if (+control.value >= this.START_YEAR) {
                this.currentYear = +control.value;
                this.showWarning = false;
                await this.renderChart(this.currentYear);
            } else {
                if (isNaN(+control.value)) {
                    this.currentYear = this.START_YEAR;
                    this.yearControl.setValue(this.START_YEAR);
                }
                this.showWarning = true;
            }
            return null;
        });
    }

    async renderChart(year) {
        const info = await this.infoBuilder.build(year);
        const chart = new CanvasJS.Chart('chartContainer', {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: `Статистика за ${year} год`
            },
            data: [{
                type: 'column',
                dataPoints: info
            }]
        });

        chart.render();
    }

    async plus() {
        this.yearControl.setValue(+this.currentYear + 1);
    }

    async minus() {
        const result = +this.currentYear - 1;
        if (result >= this.START_YEAR) {
            this.yearControl.setValue(result);
        } else {
            this.showWarning = true;
        }
    }

}

import {Component, OnInit} from '@angular/core';
import * as CanvasJS from 'libs/canvasjs/canvasjs.min';
import * as moment from 'moment';
import {FormControl} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {StatisticMonthBuilder} from '../../../utils/builder/statistic-month.builder';

@Component({
    selector: 'rp-statistic-month',
    templateUrl: './statistic-month.component.html',
    styleUrls: ['./statistic-month.component.scss']
})
export class StatisticMonthComponent implements OnInit {

    // TODO move to environment
    START_YEAR = 2019;
    currentYear = moment(new Date()).year();
    yearControl: FormControl;
    showWarning = false;

    months: string[];
    monthControl: FormControl;
    currentMonth = moment(new Date()).month();

    constructor(private infoBuilder: StatisticMonthBuilder) {
    }

    ngOnInit() {
        this.currentYear = this.START_YEAR;
        this.yearControl = new FormControl(this.currentYear, [], async (control: FormControl) => {
            if (+control.value >= this.START_YEAR) {
                this.currentYear = +control.value;
                this.showWarning = false;
                await this.renderChart(this.currentYear, this.currentMonth);
            } else {
                if (isNaN(+control.value)) {
                    this.currentYear = this.START_YEAR;
                    this.yearControl.setValue(this.START_YEAR);
                }
                this.showWarning = true;
            }
            return null;
        });

        this.months = environment.calendar.configuration.monthNames;
        this.monthControl = new FormControl(this.currentMonth, [], async (control: FormControl) => {
            this.currentMonth = +control.value;
            await this.renderChart(this.currentYear, this.currentMonth);
            return null;
        });
    }

    async renderChart(year, month) {
        const result = await this.infoBuilder.build(year, month + 1);
        const chart = new CanvasJS.Chart('chartContainer', {
            theme: 'light2',
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: `Статистика за ${this.months[month]} ${this.currentYear} года. Итого: ${result.sum}`
            },
            data: [{
                type: 'pie',
                showInLegend: true,
                toolTipContent: '<b>{name}</b>: (#percent%)',
                indexLabel: '{name} - #percent%',
                dataPoints: result.info
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

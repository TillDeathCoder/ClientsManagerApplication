import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'libs/canvasjs/canvasjs.min';

@Component({
  selector: 'rp-statistic-month',
  templateUrl: './statistic-month.component.html',
  styleUrls: ['./statistic-month.component.scss']
})
export class StatisticMonthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const chart = new CanvasJS.Chart('chartContainer', {
      theme: 'light2',
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Статистика за МЕСЯЦ'
      },
      data: [{
        type: 'pie',
        showInLegend: true,
        toolTipContent: '<b>{name}</b>: (#percent%)',
        indexLabel: '{name} - #percent%',
        dataPoints: [
          { y: 25, name: 'Отмененные', exploded: true, color: 'orange' },
          { y: 100, name: 'Закрытые' }
        ]
      }]
    });

    chart.render();
  }
}

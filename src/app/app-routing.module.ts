/* Modules */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

/* Components */
import {OperationsCalendarComponent} from './component/operation/operations-calendar/operations-calendar.component';
import {ClientsComponent} from './component/client/clients/clients.component';
import {StatisticMonthComponent} from './component/statistic/statistic-month/statistic-month.component';
import {StatisticYearComponent} from './component/statistic/statistic-year/statistic-year.component';

const routes: Routes = [
    {path: '', redirectTo: '/calendar', pathMatch: 'full'},
    {path: 'calendar', component: OperationsCalendarComponent},
    {path: 'clients', component: ClientsComponent},
    {path: 'statistic-month', component: StatisticMonthComponent},
    {path: 'statistic-year', component: StatisticYearComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

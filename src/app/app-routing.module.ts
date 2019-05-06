/* Modules */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components */
import {OperationsCalendarComponent} from './operations-calendar/operations-calendar.component';
import {ClientsComponent} from './clients/clients.component';
import {StatisticComponent} from './statistic/statistic.component';

const routes: Routes = [
  {path: '', redirectTo: '/calendar', pathMatch: 'full'},
  {path: 'calendar', component: OperationsCalendarComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'statistic', component: StatisticComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

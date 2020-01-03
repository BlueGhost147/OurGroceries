import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeOverviewComponent} from './home-overview/home-overview.component';
import {AuthGuard} from './auth.guard';
import {LockScreenComponent} from "./lock-screen/lock-screen.component";


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeOverviewComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LockScreenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

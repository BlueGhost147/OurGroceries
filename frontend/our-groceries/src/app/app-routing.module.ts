import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeOverviewComponent} from './home-overview/home-overview.component';
import {AuthGuard} from './auth.guard';
import {LockScreenComponent} from "./lock-screen/lock-screen.component";
import {ListOptionsResolver} from "./resolver/list-options-resolver";
import {ListFormComponent} from "./list-form/list-form.component";


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full',
    resolve: {
      listOptions: ListOptionsResolver
    }},
  {
    path: 'home', component: HomeOverviewComponent, canActivate: [AuthGuard],
    resolve: {
      listOptions: ListOptionsResolver
    }
  },
  {path: 'login', component: LockScreenComponent},
  {path: 'list-form', component: ListFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

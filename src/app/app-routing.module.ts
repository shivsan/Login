import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {AuthGuard} from "./guards/auth.guard";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {
    path: 'home',
    // component: AppComponent,
      canActivate: [AuthGuard],
      component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}

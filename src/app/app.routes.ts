import { Routes } from '@angular/router';
import { HomeComponent } from './features/component/home/home.component';
import { LoginComponent } from './features/component/login/login.component';
import { UserSpaceComponent } from './features/component/user-space/user-space.component';
import { NewStayComponent } from './features/component/new-stay/new-stay.component';
import { AdminSpaceComponent } from './features/component/admin-space/admin-space.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'newStay', component: NewStayComponent },
  { path: 'userSpace', component: UserSpaceComponent },
  { path: 'adminSpace', component: AdminSpaceComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

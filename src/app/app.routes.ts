import { Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {path: "", pathMatch: 'full', redirectTo: 'home'},
    {path: "home", component: HomeComponent},
    {path: "user/:_id", component: UserComponent},
    {path: "newUser", component: NewUserComponent},
    {path: "updateUser/:_id", component: NewUserComponent},
    {path: "**", redirectTo: "home"}
];

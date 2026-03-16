import { Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';

export const routes: Routes = [
    {path: "", pathMatch: 'full', redirectTo: 'home'},
    {path: "user/id", component: UserComponent},
    {path: "newUser", component: NewUserComponent},
    {path: "updateUser/:id", component: UpdateUserComponent},
    {path: "**", redirectTo: "home"}
];

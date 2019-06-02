import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BirthdayComponent } from './birthdayCakes/birthday.component';
import { ActionsComponent } from './actions/actions.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminDashComponent } from './adminDash/adminDash.component';
import { Action } from '../../node_modules/rxjs/internal/scheduler/Action';
import { CakesComponent } from './cakes/cakes.component';
import { CakeStartComponent } from './cakes/cake-start/cake-start.component';
import { CakeDetailComponent } from './cakes/cake-detail/cake-detail.component';
import { CakeEditComponent } from './cakes/cake-edit/cake-edit.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UpdateProfileComponent } from './user-profile/update-profile/update-profile.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
   { path:'gallery',component:BirthdayComponent},
   { path:'adminDash',component:AdminDashComponent,children:[
     {path:'',redirectTo:'/adminDash',pathMatch:'full'},
     {path:'cakes',component:CakesComponent, children:[
       {path:'',component:CakeStartComponent},
       {path:'new',component:CakeEditComponent},
       {path:':id',component:CakeDetailComponent},
       {path:':id/edit',component:CakeEditComponent}
     ]},
     {path:'users',component:UsersComponent}
   ]},
   { path:'orders',component:OrdersComponent},
   { path:'login',component:LoginComponent},
   { path:'register',component:RegisterComponent},
   {
    path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]
   },
   {
    path: 'userprofile/edit/:id',
    component: UpdateProfileComponent,canActivate:[AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent,canActivate:[AuthGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

///adminDash/cakes

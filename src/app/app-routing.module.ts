import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
    { path: "profile", component: PublicProfileComponent },
    { path: "edit/profile", component: EditProfileComponent },
    { path: "edit/account", component: EditAccountComponent },
    {path:"404", component: NotFoundComponent},
    {path:"**", redirectTo: "/404"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

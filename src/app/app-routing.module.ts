import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';

const routes: Routes = [
    { path: "profile", component: PublicProfileComponent },
    { path: "edit", component: EditProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

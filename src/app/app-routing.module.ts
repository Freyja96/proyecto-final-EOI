import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { NormalLayoutComponent } from './normal-layout/normal-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: NormalLayoutComponent,
    children: [
      { path: 'edit/profile', component: EditProfileComponent },
      { path: 'edit/account', component: EditAccountComponent },
      { path: 'edit', redirectTo: 'edit/profile' },
      { path: 'user/:username', component: PublicProfileComponent },
      { path: 'update/product', component: UpdateProductComponent },
      { path: 'update/product/:id', component: UpdateProductComponent },
      { path: "update/product/new", component: UpdateProductComponent },
      { path: 'update', redirectTo: 'update/product' },
      { path: 'plants', component: ProductListComponent },
      { path: 'insects', component: ProductListComponent },
      { path: 'product/:id', component: ProductComponent },
      { path: '', component: HomeComponent },
    ],
  },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SingUpComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

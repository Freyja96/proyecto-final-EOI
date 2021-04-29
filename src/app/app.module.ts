import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './product/product.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SideBarProfileComponent } from './side-bar-profile/side-bar-profile.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NormalLayoutComponent } from './normal-layout/normal-layout.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { FormBuilder, FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
      HeaderComponent,
      ProductComponent,
      EditProfileComponent,
      SideBarProfileComponent,
      EditAccountComponent,
      PublicProfileComponent,
      NotFoundComponent,
      FooterComponent,
      HomeComponent,
      NormalLayoutComponent,
      UpdateProductComponent,
      //FormsModule
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }

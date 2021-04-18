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
@NgModule({
  declarations: [	
    AppComponent,
      HeaderComponent,
      ProductComponent,
      EditProfileComponent,
      SideBarProfileComponent,
      EditAccountComponent,
      PublicProfileComponent,
      NotFoundComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

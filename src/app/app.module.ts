import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductItemComponent } from './product-item/product-item.component';
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
import { SignInComponent } from './sign-in/sign-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ValidateEmailComponent } from './validate-email/validate-email.component';
import { ChatItemComponent } from './chat-item/chat-item.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatInfoComponent } from './chat-info/chat-info.component';
@NgModule({
  declarations: [				
    AppComponent,
    HeaderComponent,
    ProductItemComponent,
    EditProfileComponent,
    SideBarProfileComponent,
    EditAccountComponent,
    PublicProfileComponent,
    NotFoundComponent,
    FooterComponent,
    HomeComponent,
    NormalLayoutComponent,
    UpdateProductComponent,
    //FormsModule,
    SignInComponent,
    SingUpComponent,
    ProductListComponent,
    ProductComponent,
      ValidateEmailComponent,
      ChatItemComponent,
      ChatListComponent,
      ChatInfoComponent
   ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [FormBuilder],
  bootstrap: [AppComponent],
})
export class AppModule {}

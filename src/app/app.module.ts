import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ValidateEmailComponent } from './validate-email/validate-email.component';
import { ChatItemComponent } from './chat-item/chat-item.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatInfoComponent } from './chat-info/chat-info.component';
import { ChatComponent } from './chat/chat.component';
import { InterceptorService } from './services/interceptors/interceptor.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { PrivacyAndUseComponent } from './privacy-and-use/privacy-and-use.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MessageItemComponent } from './message-item/message-item.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
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
    SignInComponent,
    SignUpComponent,
    ProductListComponent,
    ProductComponent,
    ValidateEmailComponent,
    ChatItemComponent,
    ChatListComponent,
    ChatInfoComponent,
    ChatComponent,
    PrivacyAndUseComponent,
    ContactUsComponent,
    MessageItemComponent,
      TermsOfUseComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS,
    },
    JwtHelperService,
    FormBuilder,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

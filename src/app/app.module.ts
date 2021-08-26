import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HeroesComponent } from './components/heroes/heroes.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {JwtInterceptor} from './models/jwt.interceptor';
import {ErrorInterceptor} from './models/error.interceptor';
import { CreateHeroComponent } from './components/create-hero/create-hero.component';
import {ReactiveFormsModule} from '@angular/forms';
import { UpdateHeroComponent } from './components/update-hero/update-hero.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { WeaponsComponent } from './components/weapons/weapons.component';
import { CreateWeaponComponent } from './components/create-weapon/create-weapon.component';
import { UpdateWeaponComponent } from './components/update-weapon/update-weapon.component';
import { AccessoriesComponent } from './components/accessories/accessories.component';
import { CreateAccessoryComponent } from './components/create-accessory/create-accessory.component';
import { UpdateAccessoryComponent } from './components/update-accessory/update-accessory.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    HeroesComponent,
    PageNotFoundComponent,
    CreateHeroComponent,
    UpdateHeroComponent,
    LoginComponent,
    LogoutComponent,
    WeaponsComponent,
    CreateWeaponComponent,
    UpdateWeaponComponent,
    AccessoriesComponent,
    CreateAccessoryComponent,
    UpdateAccessoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

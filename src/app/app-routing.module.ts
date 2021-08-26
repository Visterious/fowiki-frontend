import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {HeroesComponent} from './components/heroes/heroes.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {CreateHeroComponent} from './components/create-hero/create-hero.component';
import {UpdateHeroComponent} from './components/update-hero/update-hero.component';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';
import {WeaponsComponent} from './components/weapons/weapons.component';
import { CreateWeaponComponent } from './components/create-weapon/create-weapon.component';
import {UpdateWeaponComponent} from './components/update-weapon/update-weapon.component';
import {AccessoriesComponent} from './components/accessories/accessories.component';
import {CreateAccessoryComponent} from './components/create-accessory/create-accessory.component';
import {UpdateAccessoryComponent} from './components/update-accessory/update-accessory.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'admin', children: [
      {path: 'login', component: LoginComponent},
      {path: 'logout', component: LogoutComponent}
    ]},
  {path: 'heroes', children: [
      {path: '', component: HeroesComponent},
      {path: 'create', component: CreateHeroComponent},
      {path: 'update', component: UpdateHeroComponent}
    ]},
  {path: 'weapons', children: [
      {path: '', component: WeaponsComponent},
      {path: 'create', component: CreateWeaponComponent},
      {path: 'update', component: UpdateWeaponComponent}
    ]},
  {path: 'accessories', children: [
      {path: '', component: AccessoriesComponent},
      {path: 'create', component: CreateAccessoryComponent},
      {path: 'update', component: UpdateAccessoryComponent}
    ]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

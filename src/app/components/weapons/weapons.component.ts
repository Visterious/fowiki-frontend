import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Weapon} from '../../models/Weapon';
import {WeaponService} from '../../services/weaponService';
import {Sorting} from '../../models/sorting';
import * as config from '../../config';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.scss']
})
export class WeaponsComponent implements OnInit {
  endPoint = config.endPoint;

  weapons: Weapon[] = [];
  isAuth = true;

  constructor(private weaponsService: WeaponService,
              private sanitizer: DomSanitizer,
              private sorting: Sorting) {
    let username = JSON.parse(sessionStorage.getItem('currentUser') as string)?.username;
    this.isAuth = !!username;
  }

  ngOnInit(): void {
    this.fetchWeapons();
  }

  fetchWeapons() {
    this.weaponsService.getWeapons().subscribe(weapons => {
      this.weapons = weapons;
    })
  }

  search(event: any) {
    const searchStr = event.target.value;
    if (searchStr == '') {
      this.fetchWeapons();
    }
    else {
      this.weaponsService.getWeapons().subscribe(weapons => {
        this.weapons = weapons.filter(w => w.name.toLowerCase().indexOf(searchStr.toLowerCase()) != -1);
      });
    }
  }

  deleteHero(id: number) {
    this.weaponsService.deleteWeapon(id).subscribe(newWeapons => {
      this.weapons = newWeapons;
    })
  }

  getImgContent(image: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(this.endPoint + image);
  }

  directSort(property: string) {
    this.sorting.directSort(this.weapons, property);
  }

  descendingSort(property: string) {
    this.sorting.descendingSort(this.weapons, property);
  }

  setColor(pumping_level: any) {
    if (pumping_level == '-') {
      return '#6BD714';
    }
    else if (pumping_level == '5') {
      return '#1A96EE';
    }
    else if (pumping_level == '8') {
      return '#EE82EE';
    }
    else if (pumping_level == '10') {
      return '#FCC40A';
    }
    else {
      return '#827A79';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Accessory} from '../../models/Accessory';
import {AccessoryService} from '../../services/accessoryService';
import {Sorting} from '../../models/sorting';
import * as config from '../../config';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.scss']
})
export class AccessoriesComponent implements OnInit {
  endPoint = config.endPoint;

  accessories: Accessory[] = [];
  isAuth = true;

  constructor(private accessoryService: AccessoryService,
              private sanitizer: DomSanitizer,
              private sorting: Sorting) {
    let username = JSON.parse(sessionStorage.getItem('currentUser') as string)?.username;
    this.isAuth = !!username;
  }

  ngOnInit(): void {
    this.fetchAccessories();
  }

  fetchAccessories() {
    this.accessoryService.getAccessories().subscribe(accessories => {
      this.accessories = accessories;
    })
  }

  search(event: any) {
    const searchStr = event.target.value;
    if (searchStr == '') {
      this.fetchAccessories();
    }
    else {
      this.accessoryService.getAccessories().subscribe(accessories => {
        this.accessories = accessories.filter(a => a.name.toLowerCase().indexOf(searchStr.toLowerCase()) != -1);
      });
    }
  }

  deleteHero(id: number) {
    this.accessoryService.deleteAccessory(id).subscribe(newAccessories => {
      this.accessories = newAccessories;
    })
  }

  getImgContent(image: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(this.endPoint + image);
  }

  directSort(property: string) {
    this.sorting.directSort(this.accessories, property);
  }

  descendingSort(property: string) {
    this.sorting.descendingSort(this.accessories, property);
  }
}

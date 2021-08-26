import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isAuth = false;


  categories = [];

  constructor() {
    let username = JSON.parse(localStorage.getItem('currentUser') as string)?.username;
    this.isAuth = !!username;
    this.categories = [
      {title: 'Heroes', link: '/heroes', img: '/assets/images/heroes.png'},
      {title: 'Weapons', link: '/weapons', img: '/assets/images/weapons.png'},
      {title: 'Accessories', link: '/accessories', img: '/assets/images/accessories.png'}
    ];
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import {Hero} from '../../models/Hero';
import {HeroService} from '../../services/heroService';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Sorting} from '../../models/sorting';
import * as config from '../../config';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  endPoint = config.endPoint;

  heroes: Hero[] = [];
  isAuth = true;

  constructor(private heroService: HeroService,
              private sanitizer: DomSanitizer,
              private sorting: Sorting) {
    let username = JSON.parse(sessionStorage.getItem('currentUser') as string)?.username;
    this.isAuth = !!username;
  }

  ngOnInit(): void {
    this.fetchHeroes();
  }

  fetchHeroes() {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    })
  }

  search(event: any) {
    const searchStr = event.target.value;
    if (searchStr == '') {
      this.fetchHeroes();
    }
    else {
      this.heroService.getHeroes().subscribe(heroes => {
        this.heroes = heroes.filter(h => h.name.toLowerCase().indexOf(searchStr.toLowerCase()) != -1);
      });
    }
  }

  deleteHero(id: number) {
    this.heroService.deleteHero(id).subscribe(newHeroes => {
      this.heroes = newHeroes;
    })
  }

  getImgContent(image: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(this.endPoint + image);
  }

  directSort(property: string) {
    this.sorting.directSort(this.heroes, property);
  }

  descendingSort(property: string) {
    this.sorting.descendingSort(this.heroes, property);
  }
}

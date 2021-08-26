import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HeroService} from '../../services/heroService';
import {first} from 'rxjs/operators';
import * as uuid from 'uuid';


@Component({
  selector: 'app-update-hero',
  templateUrl: './update-hero.component.html',
  styleUrls: ['./update-hero.component.scss']
})
export class UpdateHeroComponent implements OnInit {
// @ts-ignore
  updateForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl = '/heroes';
  error = '';
  id: number;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private heroService: HeroService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
    });

    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      weapon: ['', Validators.required],
      class: ['', Validators.required],
      quality: ['', Validators.required],
      fraction: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required]
    });

    this.heroService.getHero(this.id).subscribe(hero => {
      this.f.name.setValue(hero.name);
      this.f.gender.setValue(hero.gender);
      this.f.weapon.setValue(hero.weapon);
      this.f.class.setValue(hero.class);
      this.f.quality.setValue(hero.quality);
      this.f.fraction.setValue(hero.fraction);
      this.f.description.setValue(hero.description);
      this.f.image.setValue(hero.image);
    });
  }

  get f() { return this.updateForm.controls; }

  submit() {
    this.submitted = true;

    this.loading = true;
    this.heroService.updateHero(this.id, this.f.name.value, this.f.gender.value, this.f.weapon.value,
      this.f.class.value, this.f.quality.value, this.f.fraction.value, this.f.description.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
          if (error == 'OK') {
            this.router.navigate([this.returnUrl]);
          }
        }
      );
  }
}

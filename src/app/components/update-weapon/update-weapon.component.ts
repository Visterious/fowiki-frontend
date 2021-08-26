import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {WeaponService} from '../../services/weaponService';

@Component({
  selector: 'app-update-weapon',
  templateUrl: './update-weapon.component.html',
  styleUrls: ['./update-weapon.component.scss']
})
export class UpdateWeaponComponent implements OnInit {
// @ts-ignore
  updateForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl = '/weapons';
  error = '';
  id: number;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private weaponService: WeaponService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
    });

    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      damage: ['', Validators.required],
      pumping_level: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.weaponService.getWeapon(this.id).subscribe(hero => {
      this.f.name.setValue(hero.name);
      this.f.type.setValue(hero.type);
      this.f.damage.setValue(hero.damage);
      this.f.pumping_level.setValue(hero.pumping_level);
      this.f.description.setValue(hero.description);
    });
  }

  get f() { return this.updateForm.controls; }

  submit() {
    this.submitted = true;

    this.loading = true;
    this.weaponService.updateWeapon(this.id, this.f.name.value, this.f.type.value, this.f.damage.value,
      this.f.pumping_level.value, this.f.description.value)
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

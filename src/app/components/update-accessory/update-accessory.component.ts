import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {WeaponService} from '../../services/weaponService';
import {first} from 'rxjs/operators';
import {AccessoryService} from '../../services/accessoryService';

@Component({
  selector: 'app-update-accessory',
  templateUrl: './update-accessory.component.html',
  styleUrls: ['./update-accessory.component.scss']
})
export class UpdateAccessoryComponent implements OnInit {
// @ts-ignore
  updateForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl = '/accessories';
  error = '';
  id: number;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private accessoryService: AccessoryService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
    });

    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.accessoryService.getAccessory(this.id).subscribe(hero => {
      this.f.name.setValue(hero.name);
      this.f.description.setValue(hero.description);
    });
  }

  get f() { return this.updateForm.controls; }

  submit() {
    this.submitted = true;

    this.loading = true;
    this.accessoryService.updateAccessory(this.id, this.f.name.value, this.f.description.value)
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

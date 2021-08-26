import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {WeaponService} from '../../services/weaponService';
import * as uuid from 'uuid';

@Component({
  selector: 'app-create-weapon',
  templateUrl: './create-weapon.component.html',
  styleUrls: ['./create-weapon.component.scss']
})
export class CreateWeaponComponent implements OnInit {
// @ts-ignore
  createForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl = '/weapons';
  error = '';
  selectedFile: File = null;
  url = '';
  selected = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private weaponService: WeaponService) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      damage: ['', Validators.required],
      pumping_level: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  get f() { return this.createForm.controls; }

  onSelectFile(event) {
    if (event.target.files) {
      this.selectedFile = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any) => {
        this.url = event.target.result;
      };
      this.selected = true;
    }
  }

  submit() {
    this.submitted = true;
    const fd = new FormData();
    const arr = this.selectedFile?.name.split('.');
    const name = uuid.v4() + '.' + arr[arr.length-1];
    fd.append('image', this.selectedFile, name);

    this.loading = true;
    this.weaponService.createWeapon(this.f.name.value, this.f.type.value, this.f.damage.value,
      this.f.pumping_level.value, this.f.description.value, name)
      .pipe(first())
      .subscribe(
        data => {
          this.weaponService.uploadImage(fd).subscribe(data => {}, err => {});
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

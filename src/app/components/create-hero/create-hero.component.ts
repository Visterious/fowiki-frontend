import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HeroService} from '../../services/heroService';
import {first} from 'rxjs/operators';
import * as uuid from 'uuid';

@Component({
  selector: 'app-create-hero',
  templateUrl: './create-hero.component.html',
  styleUrls: ['./create-hero.component.scss']
})
export class CreateHeroComponent implements OnInit {
  // @ts-ignore
  createForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl = '/heroes';
  error = '';
  selectedFile: File = null;
  url = '';
  selected = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private heroService: HeroService) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      weapon: ['', Validators.required],
      class: ['', Validators.required],
      quality: ['', Validators.required],
      fraction: ['', Validators.required],
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
    this.heroService.createHero(this.f.name.value, this.f.gender.value, this.f.weapon.value,
      this.f.class.value, this.f.quality.value, this.f.fraction.value, this.f.description.value, name)
      .pipe(first())
      .subscribe(
        data => {
          this.heroService.uploadImage(fd).subscribe(data => {}, err => {});
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

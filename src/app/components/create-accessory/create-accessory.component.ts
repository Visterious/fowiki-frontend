import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AccessoryService} from '../../services/accessoryService';
import * as uuid from 'uuid';

@Component({
  selector: 'app-create-accessory',
  templateUrl: './create-accessory.component.html',
  styleUrls: ['./create-accessory.component.scss']
})
export class CreateAccessoryComponent implements OnInit {
// @ts-ignore
  createForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl = '/accessories';
  error = '';
  selectedFile: File = null;
  url = '';
  selected = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private accessoryService: AccessoryService) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
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
    this.accessoryService.createAccessory(this.f.name.value, this.f.description.value, name)
      .pipe(first())
      .subscribe(
        data => {
          this.accessoryService.uploadImage(fd).subscribe(data => {}, err => {});
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

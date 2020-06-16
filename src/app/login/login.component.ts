import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {StorageService} from "../services/storage.service";
import {Keys} from "../constants/Keys";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup;
  public error: boolean = false;

  constructor(formBuilder: FormBuilder, private router: Router, private storageService: StorageService) {
    this.formGroup = formBuilder.group({
      userName: formBuilder.control(null, [Validators.required]),
      password: formBuilder.control(null, [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  async submit(): Promise<void> {
    const userName = this.formGroup.controls['userName'].value;
    const password = this.formGroup.controls['password'].value;

    if (userName === 'admin' && password === 'admin') {
      this.storageService.setValue(Keys.LOGGED_IN, true);
      await this.router.navigate(['/home']);
    } else {
      this.error = true;
    }

  }
}

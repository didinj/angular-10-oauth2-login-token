import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../app.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  username = '';
  password = '';
  name = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username : [null, Validators.required],
      password : [null, Validators.required],
      name : [null, Validators.required]
    });
  }

  onFormSubmit(): void {
    this.isLoadingResults = true;
    this.authService.register(this.registerForm.value)
      .subscribe((res: any) => {
        this.isLoadingResults = false;
        this.router.navigate(['/login']).then(_ => console.log('You are registered now!'));
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}

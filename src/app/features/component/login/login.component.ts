import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { confirmEqualValidators } from './Validators/confirm-equal.validator';
import { ComServerService } from '../../../shared/services/com-server.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup;
  signUpForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private comServerService: ComServerService
  ) {}

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.signUpForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required, Validators.email]],
        lastName: ['', Validators.required],
        firstName: ['', Validators.required],
        address: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [
          confirmEqualValidators('password', 'confirmPassword'),
          confirmEqualValidators('email', 'confirmEmail'),
        ],
      }
    );
  }

  onSignInSubmit() {
    console.log(this.signInForm.value);
  }

  onSignUpSubmit() {
    this.comServerService
      .sendData(this.signInForm.value, 'signin')
      .subscribe((response) => {
        console.log(response);
        alert('Inscription réussie');
      });
  }
}

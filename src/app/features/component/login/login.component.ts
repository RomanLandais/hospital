import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { confirmEqualValidators } from './Validators/confirm-equal.validator';
import { ComServerService } from '../../../shared/services/com-server.service';
import { SharedModule } from '../../../shared/shared.module';
import { TokenService } from '../../../shared/services/auth/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup;
  signUpForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private comServerService: ComServerService,
    private tokenService: TokenService
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
    console.log(this.signUpForm.value);
    this.comServerService
      .sendDataSignUp(this.signUpForm.value, 'signup')
      .subscribe({
        next: (response) => {
          console.log('Response:', response);
          // Extraire le token CSRF de la réponse
          const csrfToken = response.csrfToken;

          // Stocker le token CSRF dans une variable ou un service
          // Par exemple, vous pouvez le stocker dans le service AuthService
          this.tokenService.setCsrfToken(csrfToken);
          console.log('CSRF Token:', this.tokenService.getCsrfToken());
        },
        error: (error) => {
          console.error('Error:', error);
          if (error.error) {
            console.error('Error details:', error.error);
          }
        },
        complete: () => alert('Inscription réussie'),
      });
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ComServerService } from '../../../shared/services/com-server.service';
import { TokenService } from '../../../shared/services/auth/token.service';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-new-stay',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule],
  templateUrl: './new-stay.component.html',
  styleUrl: './new-stay.component.css',
})
export class NewStayComponent implements OnInit {
  newStayForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private comServerService: ComServerService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit() {
    this.newStayForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required],
      specialty: ['', Validators.required],
      doctor: ['', Validators.required],
    });
  }
  onNewStay() {
    console.log(this.newStayForm.value);

    const token = this.tokenService.getCsrfToken();
    console.log('token send', this.tokenService.getCsrfToken());

    if (token === null) {
      // Redirect to login page
      this.router.navigate(['/login']);
      alert('Authentifiez-vous svp');
      return;
    }
    this.comServerService
      .sendData(this.newStayForm.value, 'newStay', token)
      .subscribe({
        next: (response) => {
          console.log(response);
          alert('Votre demande de séjour a été enregistrée');
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }
}

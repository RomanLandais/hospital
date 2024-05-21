import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ComServerService } from '../../../shared/services/com-server.service';
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
    private comServerService: ComServerService
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

    this.comServerService
      .sendData(this.newStayForm.value, 'newStay')
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

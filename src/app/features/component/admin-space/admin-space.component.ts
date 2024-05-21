import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ComServerService } from '../../../shared/services/com-server.service';
import { SharedModule } from '../../../shared/shared.module';
import { Doctor, Schedule } from '../../../shared/types';

@Component({
  selector: 'app-admin-space',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule],
  templateUrl: './admin-space.component.html',
  styleUrl: './admin-space.component.css',
})
export class AdminSpaceComponent implements OnInit {
  newScheduleForm!: FormGroup;
  nomsPatients: string[] = [];
  nomsDoctors: string[] = [];
  newDoctorForm!: FormGroup;
  doctors: Doctor[] = [];
  schedules: Schedule[] = [];

  constructor(
    private fb: FormBuilder,
    private comServerService: ComServerService
  ) {}

  ngOnInit(): void {
    this.scheduleForm();
    this.doctorForm();
    this.loadDoctors();
    this.loadSchedules();
  }

  doctorForm(): void {
    this.newDoctorForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      specialty: ['', Validators.required],
    });
  }

  scheduleForm(): void {
    this.newScheduleForm = this.fb.group({
      consultDate: ['', Validators.required],
      doctor: ['', Validators.required],
      patient1: ['', Validators.required],
      patient2: [''],
      patient3: [''],
      patient4: [''],
      patient5: [''],
    });
  }

  onNewDoctorSubmit(): void {
    console.log(this.newDoctorForm.value);
    /* this.comServerService
      .sendData(this.newDoctorForm.value, 'newDoctor')
      .subscribe({
        next: (response) => {
          console.log(response);
          alert('Votre demande de médecin a été enregistrée');
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      }); */
  }

  onNewSchedule(): void {
    console.log(this.newScheduleForm.value);
    /* this.comServerService
      .sendData(this.newScheduleForm.value, 'newSchedule')
      .subscribe({
        next: (response) => {
          console.log(response);
          alert('Votre demande de planning a été enregistrée');
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      }); */
  }

  loadDoctors(): void {
    this.comServerService.getData('doctors').subscribe({
      next: (response: Doctor[]) => {
        this.doctors = response;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  loadSchedules(): void {
    this.comServerService.getData('schedules').subscribe({
      next: (response: Schedule[]) => {
        this.schedules = response;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }
}

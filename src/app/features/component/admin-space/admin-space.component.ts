import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ComServerService } from '../../../shared/services/com-server.service';
import { SharedModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-space',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule],
  templateUrl: './admin-space.component.html',
  styleUrl: './admin-space.component.css',
})
export class AdminSpaceComponent implements OnInit {
  newScheduleForm!: FormGroup;
  nomsPatients: { id: string; displayName: string }[] = [];
  nomsDoctors: { id: string; displayName: string }[] = [];
  loadDoctor: any[] = [];
  loaduser: any[] = [];
  newDoctorForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private comServerService: ComServerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin();
    this.scheduleForm();
    this.doctorForm();
    this.loadDoctors();
    this.loadUser();
  }
  isAdmin(): void {
    const admin = sessionStorage.getItem('admin');
    if (admin !== 'true') {
      alert(
        "Vous n'êtes pas autorisé à accéder à cette page, identifiez-vous en tant qu'administrateur"
      );
      this.router.navigate(['/login']);
    }
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
    this.comServerService
      .sendData(this.newDoctorForm.value, 'newDoctor')
      .subscribe({
        next: (response) => {
          console.log(response);
          alert('Votre médecin a été enregistrée');
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  onNewSchedule(): void {
    console.log(this.newScheduleForm.value);
    this.comServerService
      .sendData(this.newScheduleForm.value, 'newSchedule')
      .subscribe({
        next: (response) => {
          console.log(response);
          alert('Votre planning a été enregistrée');
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  loadDoctors(): void {
    this.comServerService.getData('loadDoctors').subscribe((data: any) => {
      if (data.doctors && Array.isArray(data.doctors)) {
        this.nomsDoctors = data.doctors.map((doctor: any) => ({
          id: doctor.id_doctor,
          displayName: doctor.last_name,
        }));
      } else {
        console.error(
          'Invalid data format: doctors property is missing or not an array'
        );
      }
    });
  }

  loadUser(): void {
    this.comServerService.getData('loadUsers').subscribe((data: any) => {
      if (data.users && Array.isArray(data.users)) {
        this.nomsPatients = data.users.map((user: any) => ({
          id: user.id_user,
          displayName: user.last_name,
        }));
      } else {
        console.error(
          'Invalid data format: user property is missing or not an array'
        );
      }
    });
  }
}

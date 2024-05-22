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
  nomsDoctors: { id: string; displayName: string; specialty: string }[] = [];
  selectedDoctors: any[] = [];
  doctorSpecialties: { specialty: string; doctors: any[] }[] = [];

  constructor(
    private fb: FormBuilder,
    private comServerService: ComServerService
  ) {}

  ngOnInit() {
    this.loadDoctors();
    this.newStayForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required],
      specialty: ['', Validators.required],
      doctor: ['', Validators.required],
    });
  }

  loadDoctors(): void {
    this.comServerService.getData('loadDoctors').subscribe((data: any) => {
      if (data.doctors && Array.isArray(data.doctors)) {
        this.nomsDoctors = data.doctors.map((doctor: any) => ({
          id: doctor.id_doctor,
          displayName: `${doctor.last_name}`,
          specialty: doctor.specialty,
        }));

        // Regrouper les médecins par spécialité
        this.doctorSpecialties = this.nomsDoctors.reduce(
          (acc: any[], doctor: any) => {
            const specialtyGroup = acc.find(
              (item: any) => item.specialty === doctor.specialty
            );

            if (specialtyGroup) {
              specialtyGroup.doctors.push(doctor);
            } else {
              acc.push({ specialty: doctor.specialty, doctors: [doctor] });
            }

            return acc;
          },
          []
        );
      } else {
        console.error(
          'Invalid data format: doctors property is missing or not an array'
        );
      }
    });
  }

  onSpecialtyChange(): void {
    const selectedSpecialty = this.newStayForm.get('specialty')?.value;
    const specialty = this.doctorSpecialties.find(
      (item) => item.specialty === selectedSpecialty
    );
    this.selectedDoctors = specialty ? specialty.doctors : [];
  }

  onNewStay() {
    this.comServerService
      .sendData(this.newStayForm.value, 'newStay')
      .subscribe({
        next: (response) => {
          alert('Votre demande de séjour a été enregistrée');
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComServerService } from '../../../shared/services/com-server.service';
import { TokenService } from '../../../shared/services/auth/token.service';

@Component({
  selector: 'app-new-stay',
  standalone: true,
  imports: [],
  templateUrl: './new-stay.component.html',
  styleUrl: './new-stay.component.css',
})
export class NewStayComponent implements OnInit {
  newStayForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private comServerService: ComServerService,
    private tokenService: TokenService
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
}

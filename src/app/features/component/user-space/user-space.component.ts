import { Component, OnInit } from '@angular/core';
import { ComServerService } from '../../../shared/services/com-server.service';
import { TokenService } from '../../../shared/services/auth/token.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-user-space',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user-space.component.html',
  styleUrls: ['./user-space.component.css'],
})
export class UserSpaceComponent implements OnInit {
  lastStays: any[] = [];
  currentStays: any[] = [];
  upcomingStays: any[] = [];

  constructor(
    private comServerService: ComServerService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.getLastStays();
    this.getCurrentStays();
    this.getUpcomingStays();
  }

  getLastStays() {
    const token = this.tokenService.getCsrfToken()!;
    this.comServerService.getData('lastStays').subscribe((data: any) => {
      if (data.lastStays && Array.isArray(data.lastStays)) {
        this.lastStays = data.lastStays;
        console.log('Last stays getMethod:', this.lastStays);
      } else {
        console.error(
          'Invalid data format: lastStays property is missing or not an array'
        );
      }
    });
  }

  getCurrentStays() {
    /*  const token = this.tokenService.getCsrfToken()!;
    this.comServerService.getData('currentStays').subscribe((data: any[]) => {
      this.currentStays = Object.values(data);
    }); */
  }

  getUpcomingStays() {
    /* const token = this.tokenService.getCsrfToken()!;
    this.comServerService.getData('upcomingStays').subscribe((data: any[]) => {
      this.upcomingStays = Object.values(data);
    }); */
  }
}

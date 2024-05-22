import { Component, OnInit } from '@angular/core';
import { ComServerService } from '../../../shared/services/com-server.service';
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
  comingStays: any[] = [];

  constructor(private comServerService: ComServerService) {}

  ngOnInit(): void {
    this.getLastStays();
    this.getCurrentStays();
    this.getUpcomingStays();
  }

  getLastStays() {
    this.comServerService.getData('lastStays').subscribe((data: any) => {
      if (data.lastStays && Array.isArray(data.lastStays)) {
        this.lastStays = data.lastStays;
      } else {
        console.error(
          'Invalid data format: lastStays property is missing or not an array'
        );
      }
    });
  }

  getCurrentStays() {
    this.comServerService.getData('currentStays').subscribe((data: any) => {
      if (data.currentStays && Array.isArray(data.currentStays)) {
        this.currentStays = data.currentStays;
      } else {
        console.error(
          'Invalid data format: currentStays property is missing or not an array'
        );
      }
    });
  }

  getUpcomingStays() {
    this.comServerService.getData('comingStays').subscribe((data: any) => {
      if (data.comingStays && Array.isArray(data.comingStays)) {
        this.comingStays = data.comingStays;
      } else {
        console.error(
          'Invalid data format: upcomingStays property is missing or not an array'
        );
      }
    });
  }
}

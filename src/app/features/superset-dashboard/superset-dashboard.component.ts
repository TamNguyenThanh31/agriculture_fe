import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { embedDashboard } from "@superset-ui/embedded-sdk";
import { SupersetService } from './services/superset.service';


@Component({
  selector: 'app-superset-dashboard',
  imports: [CommonModule],
  templateUrl: './superset-dashboard.component.html',
  styleUrl: './superset-dashboard.component.scss'
})
export class SupersetDashboardComponent implements OnInit{
  // guestToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZ3Vlc3RfdXNlciJ9LCJyZXNvdXJjZXMiOlt7InR5cGUiOiJkYXNoYm9hcmQiLCJpZCI6IjE3In1dLCJybHNfcnVsZXMiOltdLCJpYXQiOjE3MzY1MTU0MzMuNTkxNzQsImV4cCI6MTczNjUxNTczMy41OTE3NCwiYXVkIjoiaHR0cDovL3N1cGVyc2V0OjgwODgvIiwidHlwZSI6Imd1ZXN0In0.v610pkl8tBnQ6q5EXAKSsRDY7U7obPV3HJLthwihqKo'; // Thay bằng token của bạn
  // // dashboardUrl: SafeResourceUrl; // Đây là kiểu SafeResourceUrl
  //
  // constructor() {}
  //
  // async ngOnInit(): Promise<void> {
  //   // Nhúng dashboard bằng embedDashboard
  //   await embedDashboard({
  //     id: '0b1a869c-a998-4d1b-af6a-02b66f74b22e',  //id trong embed cua superset
  //     supersetDomain: 'http://82.112.237.22:8088/',
  //     mountPoint: document.getElementById('dashboard-container')!, // Gắn dashboard vào element có ID "dashboard-container"
  //     fetchGuestToken: async () => this.guestToken,
  //   });
  // }

  constructor(private supersetService: SupersetService) {}

  async ngOnInit(): Promise<void> {
    const guestToken = await this.supersetService.getGuestToken();

    await embedDashboard({
      id: '0b1a869c-a998-4d1b-af6a-02b66f74b22e', // ID của dashboard
      supersetDomain: 'http://82.112.237.22:8088/',
      mountPoint: document.getElementById('dashboard-container')!,
      fetchGuestToken: async () => guestToken,
    });
  }
}

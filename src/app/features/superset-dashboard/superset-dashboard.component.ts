import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import { SafeUrlPipe } from './safe-url.pipe'; // Đường dẫn tới pipe
import { CommonModule } from '@angular/common';
import { embedDashboard } from "@superset-ui/embedded-sdk";

@Component({
  selector: 'app-superset-dashboard',
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './superset-dashboard.component.html',
  styleUrl: './superset-dashboard.component.scss'
})
export class SupersetDashboardComponent implements OnInit{
  guestToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZ3Vlc3RfdXNlciJ9LCJyZXNvdXJjZXMiOlt7InR5cGUiOiJkYXNoYm9hcmQiLCJpZCI6IjE3In1dLCJybHNfcnVsZXMiOltdLCJpYXQiOjE3MzY1MTU0MzMuNTkxNzQsImV4cCI6MTczNjUxNTczMy41OTE3NCwiYXVkIjoiaHR0cDovL3N1cGVyc2V0OjgwODgvIiwidHlwZSI6Imd1ZXN0In0.v610pkl8tBnQ6q5EXAKSsRDY7U7obPV3HJLthwihqKo'; // Thay bằng token của bạn
  // dashboardUrl: SafeResourceUrl; // Đây là kiểu SafeResourceUrl

  constructor() {}

  // constructor(private sanitizer: DomSanitizer) {
  //   // Gắn token vào URL dashboard và đảm bảo kiểu SafeResourceUrl
  //   this.dashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
  //     `http://82.112.237.22:8088/superset/dashboard/17/?standalone=true&token=${this.guestToken}`
  //   );


  async ngOnInit(): Promise<void> {
    // Nhúng dashboard bằng embedDashboard
    await embedDashboard({
      id: '0b1a869c-a998-4d1b-af6a-02b66f74b22e',  //id trong embed cua superset
      supersetDomain: 'http://82.112.237.22:8088/',
      mountPoint: document.getElementById('dashboard-container')!, // Gắn dashboard vào element có ID "dashboard-container"
      fetchGuestToken: async () => this.guestToken,
    });
  }
}

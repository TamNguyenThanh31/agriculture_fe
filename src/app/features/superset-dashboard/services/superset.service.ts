import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupersetService {
  private csrfUrl = 'http://82.112.237.22:8088/api/v1/security/csrf_token/';
  private guestTokenUrl = 'http://82.112.237.22:8088/api/v1/security/guest_token/';
  private guestToken: string | null = null;

  constructor(private http: HttpClient) {}

  async getCsrfToken(): Promise<string> {
    const response = await lastValueFrom(
      this.http.get<{ result: string }>(this.csrfUrl, { withCredentials: true })
    );
    return response.result;
  }

  async getGuestToken(): Promise<string> {
    if (this.guestToken) {
      return this.guestToken;
    }

    const csrfToken = await this.getCsrfToken();

    const headers = new HttpHeaders({
      'X-CSRFToken': csrfToken,
      'Content-Type': 'application/json',
    });

    const body = {
      user: {
        username: 'guest_user',
      },
      resources: [
        {
          type: 'dashboard',
          id: '17', // ID of the dashboard
        },
      ],
      duration: 3600, // 1 hour
      rls: [],
    };

    const response = await lastValueFrom(
      this.http.post<{ guest_token: string }>(this.guestTokenUrl, body, {
        headers,
        withCredentials: true,
      })
    );

    this.guestToken = response.guest_token;
    return this.guestToken;
  }
}

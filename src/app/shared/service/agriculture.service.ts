import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface cho dữ liệu thời tiết
export interface WeatherResponse {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
  wind: {
    speed: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AgricultureService {
  private weatherApiUrl = 'http://localhost:8080/api/weather';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<WeatherResponse> {
    const url = `${this.weatherApiUrl}/${city}`;
    console.log('Calling API URL:', url); // Log URL để kiểm tra
    return this.http.get<WeatherResponse>(url);
  }

  getWeatherAndForecast(city: string): Observable<any> {
    return this.http.get(`${this.weatherApiUrl}/weather-and-forecast?city=${city}`);
  }

}

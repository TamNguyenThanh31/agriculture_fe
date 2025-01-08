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

export interface CropSeason {
  id: number;
  seasonName: string;
  cropType: string;
  area: number;
  plantingDate: string; // ISO Date string
  expectedHarvestDate: string; // ISO Date string
  status: string; // GROWING, NEAR_HARVEST, COMPLETED
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

export interface CropTask {
  id: number;
  taskName: string;
  dueDate: string; // ISO date string
  status: string;
  notes?: string;
  cost?: number;
  cropSeasonId: number;
}

@Injectable({
  providedIn: 'root',
})
export class AgricultureService {
  private weatherApiUrl = 'http://localhost:8080/api/weather';
  private apiBaseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<WeatherResponse> {
    const url = `${this.weatherApiUrl}/${city}`;
    console.log('Calling API URL:', url); // Log URL để kiểm tra
    return this.http.get<WeatherResponse>(url);
  }

  getWeatherAndForecast(city: string): Observable<any> {
    return this.http.get(`${this.weatherApiUrl}/weather-and-forecast?city=${city}`);
  }

  // CropSeason APIs
  getAllCropSeasons(): Observable<CropSeason[]> {
    return this.http.get<CropSeason[]>(`${this.apiBaseUrl}/seasons`);
  }

  getCropSeasonById(id: number): Observable<CropSeason> {
    return this.http.get<CropSeason>(`${this.apiBaseUrl}/seasons/${id}`);
  }

  createCropSeason(season: Partial<CropSeason>): Observable<CropSeason> {
    return this.http.post<CropSeason>(`${this.apiBaseUrl}/seasons/add-season`, season);
  }

  updateCropSeason(id: number, season: Partial<CropSeason>): Observable<CropSeason> {
    return this.http.put<CropSeason>(`${this.apiBaseUrl}/seasons/${id}`, season);
  }

  deleteCropSeason(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/seasons/${id}`);
  }

  // ==============================
  // CropTask APIs
  // ==============================
  getTasksBySeason(seasonId: number): Observable<CropTask[]> {
    return this.http.get<CropTask[]>(`${this.apiBaseUrl}/tasks/${seasonId}`);
  }

  getTaskById(id: number): Observable<CropTask> {
    return this.http.get<CropTask>(`${this.apiBaseUrl}/tasks/${id}`);
  }

  createCropTask(seasonId: number, task: Partial<CropTask>): Observable<CropTask> {
    return this.http.post<CropTask>(`${this.apiBaseUrl}/tasks/${seasonId}`, task);
  }


  updateCropTask(id: number, task: Partial<CropTask>): Observable<CropTask> {
    return this.http.put<CropTask>(`${this.apiBaseUrl}/tasks/${id}`, task);
  }

  deleteCropTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/tasks/${id}`);
  }

}

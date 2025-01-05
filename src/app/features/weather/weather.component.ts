import { Component, OnInit } from '@angular/core';
import { AgricultureService, WeatherResponse } from '../../shared/service/agriculture.service';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {DatePipe, DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzListComponent, NzListItemComponent} from 'ng-zorro-antd/list';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  imports: [
    NzCardComponent,
    NzInputDirective,
    NzInputGroupComponent,
    FormsModule,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    DecimalPipe,
    NzSpinComponent,
    NgIf,
    NzButtonComponent,
    NzListComponent,
    NzListItemComponent,
    DatePipe,
    NgForOf
  ]
})
export class WeatherComponent implements OnInit {
  //weatherData: WeatherResponse | null = null; // Dữ liệu thời tiết
  city: string = ''; // Thành phố mặc định
  weatherData: any = null;
  forecastData: any[] = [];
  isLoading: boolean = false;

  constructor(private agricultureService: AgricultureService) {}

  ngOnInit(): void {
    // this.fetchWeather();
    this.fetchWeatherAndForecast();
  }

  // fetchWeather(): void {
  //   if (!this.city.trim()) {
  //     alert('Please enter a valid city name');
  //     return;
  //   }
  //
  //   this.agricultureService.getWeather(this.city).subscribe({
  //     next: (data) => {
  //       console.log('Weather data received:', data); // Kiểm tra dữ liệu trả về
  //       this.weatherData = data; // Gán dữ liệu vào biến weatherData
  //     },
  //     error: (err) => {
  //       console.error('Error fetching weather data:', err);
  //       if (err.status === 404) {
  //         alert(`City "${this.city}" not found.`);
  //       } else {
  //         alert('Could not fetch weather data. Please try again.');
  //       }
  //     },
  //   });
  // }

  fetchWeatherAndForecast() {
    if (this.city) {
      this.isLoading = true; // Hiển thị trạng thái loading
      this.agricultureService.getWeatherAndForecast(this.city).subscribe(
        (data) => {
          this.weatherData = data.currentWeather;
          this.forecastData = data.forecast.list;
          this.isLoading = false; // Tắt trạng thái loading
        },
        (error) => {
          console.error('Error fetching weather data:', error);
          alert('Could not fetch weather data. Please try again.');
          this.isLoading = false; // Tắt trạng thái loading khi lỗi
        }
      );
    }
  }

}

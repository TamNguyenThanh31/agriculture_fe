import { Component, OnInit } from '@angular/core';
import { AgricultureService, WeatherResponse } from '../../shared/service/agriculture.service';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {DatePipe, DecimalPipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzButtonComponent} from 'ng-zorro-antd/button';

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
    DatePipe,
    NgForOf,
    NgOptimizedImage
  ]
})
export class WeatherComponent implements OnInit {
  //weatherData: WeatherResponse | null = null; // Dữ liệu thời tiết
  city: string = ''; // Thành phố mặc định
  weatherData: any = null;
  forecastData: any[] = [];
  filteredForecast: any[] = []; // Dữ liệu đã lọc, mỗi ngày chỉ 1 bản ghi
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
          this.filteredForecast = this.filterForecastByDay(this.forecastData); // Lọc dữ liệu
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

  // Lọc dự báo thời tiết để chỉ lấy 1 bản ghi đại diện cho mỗi ngày
  filterForecastByDay(forecast: any[]): any[] {
    const filtered = [];
    const seenDates = new Set();

    for (const item of forecast) {
      const date = new Date(item.dt * 1000).toDateString(); // Chuyển timestamp thành ngày
      if (!seenDates.has(date)) {
        filtered.push(item); // Thêm bản ghi đầu tiên của ngày vào danh sách
        seenDates.add(date); // Đánh dấu ngày này đã được xử lý
      }
    }

    return filtered;
  }

  getWeatherIcon(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }


}

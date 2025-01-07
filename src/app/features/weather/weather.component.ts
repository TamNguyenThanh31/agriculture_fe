import { Component, OnInit } from '@angular/core';
import { AgricultureService, WeatherResponse } from '../../shared/service/agriculture.service';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
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
    // Khôi phục giá trị từ localStorage
    const savedCity = localStorage.getItem('weather_city');
    const savedWeatherData = localStorage.getItem('weather_data');
    const savedForecastData = localStorage.getItem('forecast_data');
    const savedFilteredForecast = localStorage.getItem('filtered_forecast');

    if (savedCity) {
      this.city = savedCity;

      if (savedWeatherData && savedForecastData && savedFilteredForecast) {
        // Nếu dữ liệu tồn tại trong localStorage, khôi phục dữ liệu
        this.weatherData = JSON.parse(savedWeatherData);
        this.forecastData = JSON.parse(savedForecastData);
        this.filteredForecast = JSON.parse(savedFilteredForecast);
      } else {
        // Nếu không có dữ liệu, tải lại
        this.fetchWeatherAndForecast();
      }
    }
  }

  fetchWeatherAndForecast() {
    if (this.city) {
      this.isLoading = true;

      // Lưu giá trị thành phố vào localStorage
      localStorage.setItem('weather_city', this.city);

      this.agricultureService.getWeatherAndForecast(this.city).subscribe(
        (data) => {
          this.weatherData = data.currentWeather;
          this.forecastData = data.forecast.list;
          this.filteredForecast = this.filterForecastByDay(this.forecastData);

          // Lưu dữ liệu vào localStorage
          localStorage.setItem('weather_data', JSON.stringify(this.weatherData));
          localStorage.setItem('forecast_data', JSON.stringify(this.forecastData));
          localStorage.setItem('filtered_forecast', JSON.stringify(this.filteredForecast));

          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching weather data:', error);
          alert('Could not fetch weather data. Please try again.');
          this.isLoading = false;
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

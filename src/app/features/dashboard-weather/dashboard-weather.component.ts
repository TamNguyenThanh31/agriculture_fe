import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables, ChartData } from 'chart.js';
import { BaseChartDirective} from 'ng2-charts';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-dashboard-weather',
  standalone: true,
  imports: [BaseChartDirective, NzCardComponent, NgIf],
  templateUrl: './dashboard-weather.component.html',
  styleUrls: ['./dashboard-weather.component.scss']
})
export class DashboardWeatherComponent implements OnInit {
  @Input() weatherData: any[] = []; // Dữ liệu dự báo thời tiết từ component cha

  // Biểu đồ nhiệt độ
  tempChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [],
        borderColor: '#FF5733',
        fill: false,
        tension: 0.4,
      },
    ],
  };
  tempChartOptions = { responsive: true };
  tempChartType: 'line' = 'line';

  // Biểu đồ độ ẩm
  humidityChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        label: 'Humidity (%)',
        data: [],
        borderColor: '#33B5FF',
        fill: false,
        tension: 0.4,
      },
    ],
  };
  humidityChartOptions = { responsive: true };
  humidityChartType: 'line' = 'line';

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadWeatherData();
  }

  loadWeatherData(): void {
    const labels = this.weatherData.map((forecast) =>
      new Date(forecast.dt * 1000).toLocaleDateString()
    );

    const temperatures = this.weatherData.map((forecast) => forecast.main.temp);
    const humidity = this.weatherData.map((forecast) => forecast.main.humidity);

    this.tempChartData.labels = labels;
    this.tempChartData.datasets[0].data = temperatures;

    this.humidityChartData.labels = labels;
    this.humidityChartData.datasets[0].data = humidity;
  }

}

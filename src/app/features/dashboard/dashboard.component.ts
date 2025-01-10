import {Component, OnInit} from '@angular/core';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {BaseChartDirective} from 'ng2-charts';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {AgricultureService} from '../../shared/service/agriculture.service';
import { ChartData } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import {DashboardWeatherComponent} from '../dashboard-weather/dashboard-weather.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    NzCardComponent,
    NzRowDirective,
    NzColDirective,
    BaseChartDirective,
    NzSelectComponent,
    FormsModule,
    NzOptionComponent,
    NgForOf,
    NgIf,
    DashboardWeatherComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  // Biểu đồ tổng chi phí theo mùa vụ
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Tổng chi phí',
        data: [],
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        borderWidth: 1,
      },
    ],
  };
  barChartOptions = { responsive: true };
  barChartType: 'bar' = 'bar';

  // Biểu đồ trạng thái task của tất cả mùa vụ (hình tròn)
  pieChartData: ChartData<'pie'> = {
    labels: ['Chưa hoàn thành', 'Hoàn thành', 'Trễ hạn'],
    datasets: [
      {
        data: [],
        backgroundColor: ['#FFA726', '#66BB6A', '#EF5350'],
      },
    ],
  };
  pieChartOptions = { responsive: true };
  pieChartType: 'pie' = 'pie';

  // Biểu đồ trạng thái task theo mùa vụ (hình cột)
  selectedSeasonId: number | null = null;
  seasonBarChartData: ChartData<'bar'> = {
    labels: ['Đang thực hiện', 'Hoàn thành', 'Trễ hạn'],
    datasets: [
      {
        label: 'Số lượng công việc',
        data: [],
        backgroundColor: ['#FFA726', '#66BB6A', '#EF5350'],
        borderColor: '#333',
        borderWidth: 1,
      },
    ],
  };
  seasonBarChartOptions = { responsive: true };
  seasonBarChartType: 'bar' = 'bar';

  seasons: any[] = [];

  constructor(private agricultureService: AgricultureService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadSeasons();
  }

  loadDashboardData(): void {
    this.loadTotalCosts();
    this.loadTaskStatusSummary();
    this.loadSeasons();
  }

  loadTotalCosts(): void {
    this.agricultureService.getTotalCostsBySeasons().subscribe((data) => {
      this.barChartData.labels = data.map((item) => item.seasonName);
      this.barChartData.datasets[0].data = data.map((item) => item.totalCost);
    });
  }

  loadTaskStatusSummary(): void {
    this.agricultureService.getTaskStatusSummary().subscribe((data) => {
      this.pieChartData.datasets[0].data = [
        data['PENDING'] || 0,
        data['COMPLETED'] || 0,
        data['MISSED'] || 0,
      ];
    });
  }

  loadSeasons(): void {
    this.agricultureService.getAllCropSeasons().subscribe((data) => {
      this.seasons = data;

      // Chọn mùa vụ đầu tiên khi có danh sách mùa vụ
      if (data.length > 0) {
        this.selectedSeasonId = data[0].id;
        this.loadTaskStatusForSeason(this.selectedSeasonId);
      }
    });
  }


  onSeasonChange(seasonId: number | null): void {
    this.selectedSeasonId = seasonId;
    if (seasonId) {
      this.loadTaskStatusForSeason(seasonId);
    } else {
      this.seasonBarChartData.datasets[0].data = [];
    }
  }

  loadTaskStatusForSeason(seasonId: number): void {
    this.agricultureService.getTaskStatusSummaryForSeason(seasonId).subscribe((data) => {
      this.seasonBarChartData.datasets[0].data = [
        data['PENDING'] || 0,
        data['COMPLETED'] || 0,
        data['MISSED'] || 0,
      ];
    });
  }
}

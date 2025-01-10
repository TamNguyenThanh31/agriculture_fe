import {Component, TemplateRef, ViewChild} from '@angular/core';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NgForOf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  imports: [
    NzCardComponent,
    NzCardMetaComponent,
    NgOptimizedImage,
    NgForOf
  ],
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  @ViewChild('farmingIcon') farmingIcon!: TemplateRef<void>;
  @ViewChild('weatherIcon') weatherIcon!: TemplateRef<void>;
  @ViewChild('statisticsIcon') statisticsIcon!: TemplateRef<void>;
  @ViewChild('chatbotIcon') chatbotIcon!: TemplateRef<void>;
  @ViewChild('superSetIcon') superSetIcon!: TemplateRef<void>;
  @ViewChild('telebotIcon') telebotIcon!: TemplateRef<void>;

  features: Array<{ icon: TemplateRef<void>; title: string; description: string }> = [];

  ngAfterViewInit() {
    this.features = [
      {
        icon: this.farmingIcon,
        title: 'Quản lý mùa vụ',
        description: 'Theo dõi và tối ưu hóa quy trình mùa vụ của bạn.',
      },
      {
        icon: this.weatherIcon,
        title: 'Xem thời tiết',
        description: 'Cập nhật thời tiết theo thời gian thực, hỗ trợ quyết định canh tác.',
      },
      {
        icon: this.statisticsIcon,
        title: 'Thống kê',
        description: 'Phân tích và thống kê hiệu quả sản xuất của bạn.',
      },
      {
        icon: this.chatbotIcon,
        title: 'Chatbot',
        description: 'Trợ lý ảo hỗ trợ giải đáp thắc mắc 24/7.',
      },
      {
        icon: this.superSetIcon,
        title: 'Superset Apache',
        description: 'Nền tảng BI mã nguồn mở mạnh mẽ cho phân tích và trực quan hóa dữ liệu.',
      },
      {
        icon: this.telebotIcon,
        title: 'Telegram Bot',
        description: 'Công cụ tự động hóa giao tiếp và dịch vụ thông minh qua nền tảng Telegram.',
      },
    ];
  }
}

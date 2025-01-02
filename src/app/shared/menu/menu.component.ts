import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout'; // Import module của ng-zorro
import { NzMenuModule } from 'ng-zorro-antd/menu';  // Import module menu của ng-zorro
import { RouterModule } from '@angular/router'; // Để sử dụng routerLink

@Component({
  selector: 'app-menu',
  standalone: true,  // Đảm bảo đây là standalone component
  imports: [NzLayoutModule, NzMenuModule, RouterModule], // Import các module cần thiết
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'] // Đảm bảo sử dụng 'styleUrls' thay vì 'styleUrl'
})
export class MenuComponent {}

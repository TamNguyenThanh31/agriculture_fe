import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MenuComponent} from './shared/menu/menu.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';  // Import các module của ng-zorro
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-root',
  imports: [MenuComponent, RouterModule, NzLayoutModule, NzMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'agriculture-fe';
}

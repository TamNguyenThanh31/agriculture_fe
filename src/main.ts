import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Đảm bảo 'routes' được export từ 'app.routes'
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core'; // Import từ @angular/core
import { NzLayoutModule } from 'ng-zorro-antd/layout'; // Import module của ng-zorro
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { icons } from './app/icons-provider';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

registerLocaleData(en);  // Import module menu của ng-zorro

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Đảm bảo 'routes' đã được định nghĩa đúng
    provideHttpClient(),
    importProvidersFrom(NzLayoutModule, NzMenuModule), provideNzIcons(icons), provideNzI18n(en_US), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient() // Đưa các module ng-zorro vào providers
  ]
})
  .catch((err) => console.error(err));

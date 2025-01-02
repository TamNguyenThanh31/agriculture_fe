import { Routes } from '@angular/router';
import { SeasonComponent } from './features/season/season.component';
import { WeatherComponent } from './features/weather/weather.component';
import { ChatbotComponent } from './features/chatbot/chatbot.component';

export const routes: Routes = [
  { path: '', component: SeasonComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'chatbot', component: ChatbotComponent },
  { path: '**', redirectTo: '' }
];

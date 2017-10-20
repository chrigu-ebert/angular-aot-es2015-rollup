import './polyfills';
import './css/style.css';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app';

platformBrowserDynamic().bootstrapModule(AppModule);

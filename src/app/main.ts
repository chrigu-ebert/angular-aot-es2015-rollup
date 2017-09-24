import './polyfills';
import '../css/style.css';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app';

platformBrowserDynamic().bootstrapModule(AppModule);

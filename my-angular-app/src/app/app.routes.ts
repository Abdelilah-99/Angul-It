import { Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './home-component/home-component';
import { CaptchaComponent } from './captcha-component/captcha-component';
import { ResultComponent } from './result-component/result-component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "home", component: HomeComponent},
    {path: "captcha", component: CaptchaComponent},
    {path: "result", component: ResultComponent}
];

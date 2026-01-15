import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
  constructor(private router: Router, @Inject(PLATFORM_ID) platformId: Object) { }

  StartCaptcha(): void {
    this.router.navigate(['/captcha'])
  }
}

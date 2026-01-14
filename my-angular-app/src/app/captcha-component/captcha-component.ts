import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-captcha-component',
  imports: [],
  templateUrl: './captcha-component.html',
  styleUrl: './captcha-component.css',
})
export class CaptchaComponent implements OnInit {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const level = localStorage.getItem('level');
      if (level == null || level == '0') {
        localStorage.setItem('level', '0');
        console.log("it's level one");
        this.captchaLevelZero();
      } else if (level == '1') {
        this.captchaLevelOne();
        console.log("it's level one");
      } else if (level == '2') {
        this.captchaLevelTwo();
        console.log("it's level two");
      }
    }
  }

  captchaLevelZero() {
    
  }

  captchaLevelOne() {

  }

  captchaLevelTwo() {

  }
}

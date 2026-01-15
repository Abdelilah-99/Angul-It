import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { platform } from 'os';

@Component({
  selector: 'app-result-component',
  imports: [CommonModule],
  templateUrl: './result-component.html',
  styleUrl: './result-component.css',
})
export class ResultComponent {
  stats = {
    level0Failures: 0,
    level0Attempts: 0,
    level1Failures: 0,
    level1Attempts: 0,
    level2Failures: 0,
    level2Attempts: 0,
    totalAttempts: 0,
    totalFailures: 0
  };

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(platformId)) {
      const level = localStorage.getItem('level');
      if (level != 'done') {
        this.router.navigate(['/home']);
      }
      this.loadStats();
    }
  }

  loadStats(): void {
    const savedStats = localStorage.getItem('captchaStats');
    if (savedStats) {
      this.stats = JSON.parse(savedStats);
    }
  }

  getSuccessRate(): number {
    if (this.stats.totalAttempts === 0) return 0;
    return ((this.stats.totalAttempts - this.stats.totalFailures) / this.stats.totalAttempts) * 100;
  }

  getLevel0SuccessRate(): number {
    if (this.stats.level0Attempts === 0) return 0;
    return ((this.stats.level0Attempts - this.stats.level0Failures) / this.stats.level0Attempts) * 100;
  }

  getLevel1SuccessRate(): number {
    if (this.stats.level1Attempts === 0) return 0;
    return ((this.stats.level1Attempts - this.stats.level1Failures) / this.stats.level1Attempts) * 100;
  }

  getLevel2SuccessRate(): number {
    if (this.stats.level2Attempts === 0) return 0;
    return ((this.stats.level2Attempts - this.stats.level2Failures) / this.stats.level2Attempts) * 100;
  }

  restartChalleng() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('level', '0');
      localStorage.removeItem('captchaStats');
      this.router.navigate(['/home']);
    }
  }
}

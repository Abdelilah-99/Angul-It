import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastComponent } from '../toast/component/toastComponent';
import { ToastService } from '../toast/service/toast';

@Component({
  selector: 'app-captcha-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './captcha-component.html',
  styleUrl: './captcha-component.css',
  standalone: true
})
export class CaptchaComponent implements OnInit {
  captchaNumber: number = -1;
  selectedChoice: number = -1;
  count: number = 0;
  msg: String | null;
  captchaPage = 0;

  toastMessage: { text: string, type: 'success' | 'error' | 'warning' } | null = null;
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

  captchaStatsImg = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]

  tasks = [
    { name: 'Run away', completed: false, id: 0 },
    { name: 'Share honey with it', completed: false, id: 1 },
    { name: 'Bear mace!', completed: false, id: 2 }
  ];

  grid = [
    ['X', 'O', 'X'],
    ['O', '', 'X'],
    ['X', 'O', 'O']
  ];
  selectedCell: { row: number, col: number } | null = null;
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object, private toasService: ToastService) {
    this.msg = null;
  }

  loadStats(): void {
    const savedStats = localStorage.getItem('captchaStats');
    if (savedStats) {
      this.stats = JSON.parse(savedStats);
    }
  }

  saveStats(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('captchaStats', JSON.stringify(this.stats));
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadStats();
      const level = localStorage.getItem('level');
      if (level == null || level == '0') {
        localStorage.setItem('level', '0');
        localStorage.setItem('captchaZero', '0');
        console.log("it's level zero");
        this.captchaNumber = 0;
      } else if (level == '1') {
        localStorage.setItem('level', '1');
        localStorage.setItem('captchaZero', '0')
        console.log("it's level one");
        this.captchaPage = 1;
        this.captchaNumber = 1;
      } else if (level == '2') {
        localStorage.setItem('level', '2');
        localStorage.setItem('captchaZero', '0')
        this.captchaNumber = 2;
        this.captchaPage = 2;
        console.log("it's level two");
      } else if (level == 'done') {
        this.router.navigate(['result']);
      }
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goNext() {
    if (this.captchaPage === 2) {
      return;
    }
    this.captchaPage++;
  }

  goBack() {
    if (this.captchaPage === 0) {
      return;
    }
    this.captchaPage--;
  }

  onSubmit() {
    console.log("=============== " + this.selectedChoice);
    this.stats.level0Attempts++;
    this.stats.totalAttempts++;

    if (this.selectedChoice === 0) {
      this.msg = "Congrats! Moving to next challenge."
      this.toasService.show(this.msg, 'success');
      localStorage.setItem('level', '1');
      this.captchaNumber = 1;
    } else {
      this.msg = "Wrong answer. Try again!";
      this.toasService.show(this.msg, 'error');
      this.stats.level0Failures++;
      this.stats.totalFailures++;
    }
    this.saveStats();
  }

  captchaImgNum(n: number) {
    this.captchaStatsImg[n] = !this.captchaStatsImg[n];
    console.log(this.captchaStatsImg[n]);
  }

  selectCell(row: number, col: number) {
    if (this.grid[row][col] === '') {
      this.selectedCell = { row, col };
      this.grid[row][col] = 'X';
      this.msg = null;
    }
  }

  submitTicTacToe() {
    this.stats.level1Attempts++;
    this.stats.totalAttempts++;

    if (this.selectedCell && this.selectedCell.row === 1 && this.selectedCell.col === 1) {
      this.msg = "Correct! You found the winning move!";
      this.toasService.show(this.msg, 'success');
      localStorage.setItem('level', '2');
      this.captchaNumber = 2;
    } else if (this.selectedCell) {
      this.msg = "Wrong move. Try again!";
      this.toasService.show(this.msg, 'error');
      this.stats.level1Failures++;
      this.stats.totalFailures++;
    } else {
      this.msg = "Please select a cell first.";
      this.toasService.show(this.msg, 'warning');
    }
    this.saveStats();
  }

  onValidate() {
    this.stats.level2Attempts++;
    this.stats.totalAttempts++;
    let c = 0;
    for (let index = 0; index < this.captchaStatsImg.length; index++) {
      if (!this.captchaStatsImg[index]) {
        c++;
      }
    }
    if (c === 4 && this.captchaStatsImg[0]
      && this.captchaStatsImg[1]
      && this.captchaStatsImg[2]
      && this.captchaStatsImg[3]
      && this.captchaStatsImg[4]) {
      this.msg = "Success!!";
      this.toasService.show(this.msg, 'success');
      localStorage.setItem('level', 'done');
      this.router.navigate(['/result']);
      this.saveStats();
      return;
    }
    this.msg = `Wrong! . Try again!`;
    this.toasService.show(this.msg, 'error');
    this.stats.level2Failures++;
    this.stats.totalFailures++;
    this.count = 0;
    this.saveStats();
  }
}

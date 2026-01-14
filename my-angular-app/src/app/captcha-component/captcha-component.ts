import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  msg: String | null;
  tasks = [
    { name: 'Run away', completed: false, id: 0 },
    { name: 'Share honey with it', completed: false, id: 1 },
    { name: 'Bear mace!', completed: false, id: 2 }
  ];
  
  // Tic-tac-toe grid for level 1
  grid = [
    ['', 'O', 'X'],
    ['', '', 'O'],
    ['X', 'O', 'X']
  ];
  selectedCell: { row: number, col: number } | null = null;
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(PLATFORM_ID)) {
      const level = localStorage.getItem('level');
      if (level == null) {
        this.selectedChoice = 0;
      }
    }
    this.msg = null;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const level = localStorage.getItem('level');
      if (level == null || level == '0') {
        localStorage.setItem('level', '0');
        console.log("it's level zero");
        this.captchaNumber = 0;
      } else if (level == '1') {
        localStorage.setItem('level', '1');
        console.log("it's level one");
        this.captchaNumber = 1;
      } else if (level == '2') {
        localStorage.setItem('level', '2');
        this.captchaNumber = 2;
        console.log("it's level two");
      }
    }
  }

  onSubmit() {
    console.log("=============== " + this.selectedChoice);
    if (this.selectedChoice === 0) {
      this.msg = "Congrats! Moving to next challenge."
      localStorage.setItem('level', '1');
      this.captchaNumber = 1;
    } else {
      this.msg = "Wrong answer. Try again!";
    }
  }

  selectCell(row: number, col: number) {
    if (this.grid[row][col] === '') {
      this.selectedCell = { row, col };
      this.msg = null;
    }
  }

  submitTicTacToe() {
    if (this.selectedCell && this.selectedCell.row === 1 && this.selectedCell.col === 1) {
      this.msg = "Correct! You found the winning move!";
      localStorage.setItem('level', '2');
      this.captchaNumber = 2;
    } else if (this.selectedCell) {
      this.msg = "Wrong move. Try again!";
    } else {
      this.msg = "Please select a cell first.";
    }
  }
}

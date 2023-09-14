import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { filter } from 'rxjs';
import { pomodoroService } from '../pomodoro.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-finishpage',
  templateUrl: './finishpage.component.html',
  styleUrls: ['./finishpage.component.css'],
  animations: [
    trigger('fade', [
      state('hidden', style({ opacity: 0, display: 'none' })),
      state('visible', style({ opacity: 1, display: 'block' })),
      transition('hidden => visible', animate('1000ms ease-in')),
      transition('visible => hidden', animate('10ms ease-out')),
    ]),
  ],
})
export class finishpageComponent implements OnInit {
  continue: boolean = false;


   incrementCycles() {
    this.cycles++;
  }
  decrementCycles() {
    if (this.cycles > 1) {
      this.cycles--;
    }
  }

  toggleContinue() {
    this.continue = !this.continue;
  }
  isRunning: boolean = false;
  workMinutes: number = 2;
  breakMinutes: number = 1;
  cycles: number = 1; 
  currentCycle: number = 1;
  minutes: number = this.workMinutes;
  seconds: number = 0;
  interval: any;
  isBreak: boolean = false;
  showModal: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.resetTimer();
  }

  startTimer(): void {
    if (!this.isRunning) {
      this.interval = setInterval(() => {
        if (this.seconds > 0) {
          this.seconds--;
        } else if (this.minutes > 0) {
          this.minutes--;
          this.seconds = 59;
        } else {
          this.switchTimer();
        }
      }, 1000);
      this.isRunning = true;
    }
  }

  pauseTimer(): void {
    clearInterval(this.interval);
    this.isRunning = false;
  }

  resetTimer(): void {
    this.pauseTimer();
    this.minutes = this.workMinutes;
    this.seconds = 0;
    this.currentCycle = 1;
    this.isBreak = false;
  }

  private switchTimer(): void {
    if (this.currentCycle % 2 === 0) {
      this.minutes = this.workMinutes;
      this.isBreak = false;
    } else {
      this.minutes = this.breakMinutes;
      this.isBreak = true;
    }

    if (this.currentCycle < this.cycles) {
      this.currentCycle++;
    } else {
      this.resetTimer();
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
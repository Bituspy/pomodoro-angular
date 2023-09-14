import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter } from 'rxjs';
import { pomodoroService } from '../pomodoro.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pomodoropage',
  templateUrl: './pomodoropage.component.html',
  styleUrls: ['./pomodoropage.component.css'],
  animations: [
    trigger('fade', [
      state('hidden', style({ opacity: 0, display: 'none' })),
      state('visible', style({ opacity: 1, display: 'block' })),
      transition('hidden => visible', animate('1000ms ease-in')),
      transition('visible => hidden', animate('10ms ease-out')),
    ]),
  ],
})
export class pomodoroPageComponent implements OnInit {
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
  randomActivity: any;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.resetTimer();
    this.fetchRandomActivity();
  }

  fetchRandomActivity(): void {
    this.http.get<any[]>('/assets/ideas.json').subscribe((data) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      this.randomActivity = data[randomIndex];
      console.log(this.randomActivity);
    });
  }

  startTimer(): void {
    if (!this.isRunning) {
      this.interval = setInterval(() => {
        if (this.seconds > 0) {
          this.seconds = 0;
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
    if (this.isBreak) {
      // Switching from a break to work
      this.minutes = this.workMinutes;
      this.isBreak = false;
    } else {
      // Switching from work to a break
      this.minutes = this.breakMinutes;
      this.isBreak = true;
    }

    if (this.isBreak && this.currentCycle <= this.cycles) {
      this.currentCycle++; // Increment the cycle count only during breaks
    }

    if (this.currentCycle <= this.cycles) {
      // Continue to the next cycle
      this.seconds = 0; // Reset seconds for the new cycle
    } else {
      // All cycles completed
      //router redirect to finish page
      this.resetTimer();
      alert('ok');
      this.router.navigate(['/finish']);
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.minutes = this.workMinutes;
  }
}

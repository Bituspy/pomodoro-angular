import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { filter } from 'rxjs';
import { pomodoroService } from '../pomodoro.service';

@Component({
  selector: 'app-pomodoropage',
  templateUrl: './pomodoropage.component.html',
  styleUrls: ['./pomodoropage.component.css'],
})
export class pomodoroPageComponent implements OnInit {
  isPomodoro: any;
  currentPomodoro: any;
  pomodoroTime: any;
  name: any;
  min: any;
  isStarted:any;
  sec: any;
  time: any;
  pnumber: any;
  ngOnInit(): void {}
  constructor(
    private fbuiler: FormBuilder,
    private pomodoroService: pomodoroService
  ) {
    this.name = this.pomodoroService.getName() || null;
    if (
      this.pomodoroService.getName() == '' ||
      this.pomodoroService.getName() == undefined
    ) {
      let n = prompt('Enter your name');
      if (n) {
        this.pomodoroService.setName(n);
      }
    }

     if (this.pomodoroService.getCurrentPomodoro() != "-1") {
      for (let i = 1;i<this.pomodoroService.isPomodoro();i++){
        if (this.sec != 0) {
        setInterval(() => {
          this.sec -= 1;
        }, 1000);
      }  else {
           setInterval(() => {
          this.min -= 1;
          this.sec = 59;
        }, 1000);
    }
     }
  }
  }

  setMinutes(event: Event) {
    const minutesValue = (event.target as HTMLInputElement).value;
    this.min = parseInt(minutesValue);
    this.calculatePomodoroTime();
  }
  setSeconds(event: Event) {
    const secondsValue = (event.target as HTMLInputElement).value;
    this.sec = parseInt(secondsValue);
    this.calculatePomodoroTime();
  }

  setPomodoroNumber(event:Event){
    const pomodoroNumber = (event.target as HTMLInputElement).value;
    this.pnumber = parseInt(pomodoroNumber);
  }

  calculatePomodoroTime(){
    this.time = (this.min * 60 || 0 ) + (this.sec || 0)
    alert(this.time + " in seconds.");
  }

  start(){
    this.isStarted = true;
    alert("Started");
    let data = {"1":this.time,"2":this.pnumber}
    alert(data["1"].toString() + " " +  data["2"].toString());
    this.pomodoroService.setPomodoro(this.pnumber);
    this.pomodoroService.setPomodoroTime(this.time);
    this.currentPomodoro(1);
  }
}


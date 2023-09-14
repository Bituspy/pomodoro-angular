import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class pomodoroService {

  constructor(private httpClient: HttpClient) {
  }
  
  isPomodoro(){
    return localStorage.getItem("isPomodoro") || 0;
  }
  setPomodoro(n:number){
    localStorage.setItem("isPomodoro",n.toString());
  }
  getCurrentPomodoro(){
    return localStorage.getItem("currentPomodoro") || 0;
  }
  setCurrentPomodoro(n:Number){
    localStorage.setItem("currentPomodoro",n.toString());
  }
  setPomodoroTime(n:Number){
    localStorage.setItem("pomodoroTime",n.toString());
  }
  getPomodoroTime(){
    return localStorage.getItem("pomodoroTime");
  }
  setName(n:string){
    localStorage.setItem("name",n);
  }
  getName(){
    return localStorage.getItem("name");
  }
}

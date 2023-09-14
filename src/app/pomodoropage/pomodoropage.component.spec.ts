import { ComponentFixture, TestBed } from '@angular/core/testing';

import { pomodoroPageComponent } from './pomodoropage.component';

describe('pomodoroPageComponent', () => {
  let component: pomodoroPageComponent;
  let fixture: ComponentFixture<pomodoroPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ pomodoroPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(pomodoroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

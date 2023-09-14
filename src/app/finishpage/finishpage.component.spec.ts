import { ComponentFixture, TestBed } from '@angular/core/testing';

import { finishpageComponent } from './finishpage.component';

describe('finishpageComponent', () => {
  let component: finishpageComponent;
  let fixture: ComponentFixture<finishpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ finishpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(finishpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

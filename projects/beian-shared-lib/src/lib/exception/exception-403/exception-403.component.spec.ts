import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exception403Component } from './exception-403.component';

describe('Exception403Component', () => {
  let component: Exception403Component;
  let fixture: ComponentFixture<Exception403Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exception403Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Exception403Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

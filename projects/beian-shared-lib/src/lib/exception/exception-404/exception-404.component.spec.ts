import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exception404Component } from './exception-404.component';

describe('Exception404Component', () => {
  let component: Exception404Component;
  let fixture: ComponentFixture<Exception404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exception404Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Exception404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

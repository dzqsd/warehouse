import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeDescriptionComponent } from './time-description.component';

describe('TimeDescriptionComponent', () => {
  let component: TimeDescriptionComponent;
  let fixture: ComponentFixture<TimeDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeDescriptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

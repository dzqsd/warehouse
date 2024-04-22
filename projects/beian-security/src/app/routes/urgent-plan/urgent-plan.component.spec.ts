import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrgentPlanComponent } from './urgent-plan.component';

describe('UrgentPlanComponent', () => {
  let component: UrgentPlanComponent;
  let fixture: ComponentFixture<UrgentPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrgentPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UrgentPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutePlaningComponent } from './route-planing.component';

describe('RoutePlaningComponent', () => {
  let component: RoutePlaningComponent;
  let fixture: ComponentFixture<RoutePlaningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutePlaningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoutePlaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

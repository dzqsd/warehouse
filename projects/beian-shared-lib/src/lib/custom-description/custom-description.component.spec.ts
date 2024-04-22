import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDescriptionComponent } from './custom-description.component';

describe('CustomDescriptionComponent', () => {
  let component: CustomDescriptionComponent;
  let fixture: ComponentFixture<CustomDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomDescriptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

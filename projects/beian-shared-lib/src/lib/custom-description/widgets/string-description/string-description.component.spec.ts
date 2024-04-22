import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringDescriptionComponent } from './string-description.component';

describe('StringDescriptionComponent', () => {
  let component: StringDescriptionComponent;
  let fixture: ComponentFixture<StringDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StringDescriptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StringDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilingDetailsComponent } from './filing-details.component';

describe('FilingDetailsComponent', () => {
  let component: FilingDetailsComponent;
  let fixture: ComponentFixture<FilingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilingDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

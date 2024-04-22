import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilingQueryComponent } from './filing-query.component';

describe('FilingQueryComponent', () => {
  let component: FilingQueryComponent;
  let fixture: ComponentFixture<FilingQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilingQueryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilingQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

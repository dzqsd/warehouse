import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgDescriptionComponent } from './img-description.component';

describe('ImgDescriptionComponent', () => {
  let component: ImgDescriptionComponent;
  let fixture: ComponentFixture<ImgDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgDescriptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImgDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

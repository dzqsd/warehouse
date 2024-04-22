import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpImgComponent } from './http-img.component';

describe('HttpImgComponent', () => {
  let component: HttpImgComponent;
  let fixture: ComponentFixture<HttpImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpImgComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HttpImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

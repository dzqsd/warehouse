import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceSupplyComponent } from './resource-supply.component';

describe('ResourceSupplyComponent', () => {
  let component: ResourceSupplyComponent;
  let fixture: ComponentFixture<ResourceSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceSupplyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourceSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

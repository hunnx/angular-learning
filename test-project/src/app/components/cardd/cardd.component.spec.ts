import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarddComponent } from './cardd.component';

describe('CarddComponent', () => {
  let component: CarddComponent;
  let fixture: ComponentFixture<CarddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

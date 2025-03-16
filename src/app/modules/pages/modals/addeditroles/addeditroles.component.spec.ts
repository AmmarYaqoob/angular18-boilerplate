import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditrolesComponent } from './addeditroles.component';

describe('AddeditrolesComponent', () => {
  let component: AddeditrolesComponent;
  let fixture: ComponentFixture<AddeditrolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddeditrolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditrolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeimageviewComponent } from './largeimageview.component';

describe('LargeimageviewComponent', () => {
  let component: LargeimageviewComponent;
  let fixture: ComponentFixture<LargeimageviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LargeimageviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LargeimageviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

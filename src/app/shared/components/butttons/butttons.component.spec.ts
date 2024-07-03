import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButttonsComponent } from './butttons.component';

describe('ButttonsComponent', () => {
  let component: ButttonsComponent;
  let fixture: ComponentFixture<ButttonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButttonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButttonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

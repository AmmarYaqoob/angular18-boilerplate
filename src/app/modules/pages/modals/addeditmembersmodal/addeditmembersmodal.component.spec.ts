import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditmembersmodalComponent } from './addeditmembersmodal.component';

describe('AddeditmembersmodalComponent', () => {
  let component: AddeditmembersmodalComponent;
  let fixture: ComponentFixture<AddeditmembersmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddeditmembersmodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditmembersmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

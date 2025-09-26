import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomework } from './add-homework';

describe('AddHomework', () => {
  let component: AddHomework;
  let fixture: ComponentFixture<AddHomework>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddHomework]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHomework);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

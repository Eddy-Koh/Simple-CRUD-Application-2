import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardTeacher } from './board-teacher';

describe('BoardTeacher', () => {
  let component: BoardTeacher;
  let fixture: ComponentFixture<BoardTeacher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardTeacher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardTeacher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardStudent } from './board-student';

describe('BoardStudent', () => {
  let component: BoardStudent;
  let fixture: ComponentFixture<BoardStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

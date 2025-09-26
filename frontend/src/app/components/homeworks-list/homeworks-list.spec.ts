import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeworksList } from './homeworks-list';

describe('HomeworksList', () => {
  let component: HomeworksList;
  let fixture: ComponentFixture<HomeworksList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeworksList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeworksList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

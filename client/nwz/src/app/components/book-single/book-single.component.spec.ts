import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSingleComponent } from './book-single.component';

describe('BookSingleComponent', () => {
  let component: BookSingleComponent;
  let fixture: ComponentFixture<BookSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

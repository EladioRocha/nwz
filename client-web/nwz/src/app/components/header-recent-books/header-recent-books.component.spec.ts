import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRecentBooksComponent } from './header-recent-books.component';

describe('HeaderRecentBooksComponent', () => {
  let component: HeaderRecentBooksComponent;
  let fixture: ComponentFixture<HeaderRecentBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderRecentBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderRecentBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

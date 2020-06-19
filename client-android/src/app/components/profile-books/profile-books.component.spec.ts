import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBooksComponent } from './profile-books.component';

describe('ProfileBooksComponent', () => {
  let component: ProfileBooksComponent;
  let fixture: ComponentFixture<ProfileBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

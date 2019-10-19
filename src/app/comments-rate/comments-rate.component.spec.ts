import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsRateComponent } from './comments-rate.component';

describe('CommentsRateComponent', () => {
  let component: CommentsRateComponent;
  let fixture: ComponentFixture<CommentsRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

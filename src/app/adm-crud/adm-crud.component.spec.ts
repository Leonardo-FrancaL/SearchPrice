import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmCrudComponent } from './adm-crud.component';

describe('AdmCrudComponent', () => {
  let component: AdmCrudComponent;
  let fixture: ComponentFixture<AdmCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

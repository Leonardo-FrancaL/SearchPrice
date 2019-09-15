import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCrdComponent } from './produto-crd.component';

describe('ProdutoCrdComponent', () => {
  let component: ProdutoCrdComponent;
  let fixture: ComponentFixture<ProdutoCrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoCrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoCrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

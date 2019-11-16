import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosSResultComponent } from './produtos-sresult.component';

describe('ProdutosSResultComponent', () => {
  let component: ProdutosSResultComponent;
  let fixture: ComponentFixture<ProdutosSResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutosSResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosSResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

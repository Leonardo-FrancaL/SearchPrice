import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoItensComponent } from './produto-itens.component';

describe('ProdutoItensComponent', () => {
  let component: ProdutoItensComponent;
  let fixture: ComponentFixture<ProdutoItensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoItensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

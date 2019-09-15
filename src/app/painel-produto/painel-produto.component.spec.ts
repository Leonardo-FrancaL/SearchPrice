import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelProdutoComponent } from './painel-produto.component';

describe('PainelProdutoComponent', () => {
  let component: PainelProdutoComponent;
  let fixture: ComponentFixture<PainelProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PainelProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

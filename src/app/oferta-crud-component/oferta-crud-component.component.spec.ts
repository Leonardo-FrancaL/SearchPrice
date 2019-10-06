import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaCrudComponentComponent } from './oferta-crud-component.component';

describe('OfertaCrudComponentComponent', () => {
  let component: OfertaCrudComponentComponent;
  let fixture: ComponentFixture<OfertaCrudComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertaCrudComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaCrudComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

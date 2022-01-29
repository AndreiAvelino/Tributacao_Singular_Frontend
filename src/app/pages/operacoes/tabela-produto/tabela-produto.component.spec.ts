import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaProdutoComponent } from './tabela-produto.component';

describe('TabelaProdutoComponent', () => {
  let component: TabelaProdutoComponent;
  let fixture: ComponentFixture<TabelaProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarArquivoProdutoComponent } from './adicionar-arquivo-produto.component';

describe('AdicionarArquivoProdutoComponent', () => {
  let component: AdicionarArquivoProdutoComponent;
  let fixture: ComponentFixture<AdicionarArquivoProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarArquivoProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarArquivoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

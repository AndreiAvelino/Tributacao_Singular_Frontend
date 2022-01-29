import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaCategoriaComponent } from './tabela-categoria.component';

describe('TabelaCategoriaComponent', () => {
  let component: TabelaCategoriaComponent;
  let fixture: ComponentFixture<TabelaCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

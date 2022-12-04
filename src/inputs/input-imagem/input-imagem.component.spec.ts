import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputImagemComponent } from './input-imagem.component';

describe('InputImagemComponent', () => {
  let component: InputImagemComponent;
  let fixture: ComponentFixture<InputImagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputImagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputImagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

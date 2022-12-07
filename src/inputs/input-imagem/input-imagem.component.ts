import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-imagem',
  templateUrl: './input-imagem.component.html',
  styleUrls: ['./input-imagem.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputImagemComponent,
      multi: true
    }
  ]

})
export class InputImagemComponent implements ControlValueAccessor {

  @ViewChild("inputImg") inputImg; 

  private innerValue: String = "";
  public imagemAExibir: any;

  @Output() emitBtnRemoverImagem = new EventEmitter();

  
  onChange: (v: any) => void = () => {}

  get value() {
    return this.innerValue
  }

  set value(v: any) {

    if(v != ''){
      this.imagemAExibir = "data:image/png;base64," + v
    } else {
      this.imagemAExibir = ''
    }

    this.innerValue = v;    
    this.onChange(v);
  }


  constructor() { }
  writeValue(v: any): void {
    if(v){
      this.imagemAExibir = "data:image/png;base64," + v
      this.value = v;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

  setDisabledState?(isDisabled: boolean): void {

  }

  public SelecionarImagem(): void {
    var teste = this.inputImg.nativeElement
    this.inputImg.nativeElement.click()
  }

  public RemoverImagem(): void {
    this.value = "";
    this.emitBtnRemoverImagem.emit();
  }

  onSelectFile(files, event) { 

    if(files.length == 0){
      return;
    }

    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
    
        reader.readAsDataURL(event.target.files[0]); 
    
        reader.onload = (event) => { 
          this.imagemAExibir = event.target.result;
        }
    }

    this.value = files[0]

    event.target.value = ''
  }

  public HabilitaBotaoAdicionar(): boolean {
    if(this.innerValue != ""){
      return true;
    }

    return false;
  }

  public HabilitarBotaoRemover(): boolean {
    if(this.innerValue == ""){
      return true;
    }

    return false;
  }


}

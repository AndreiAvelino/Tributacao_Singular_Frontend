import { Component, OnInit, ViewChild } from '@angular/core';
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

  private innerValue: any;


  
  onChange: (v: any) => void = () => {}

  get value() {
    return this.innerValue
  }

  set value(v: any) {
    this.innerValue = v;
    this.onChange(v);
  }


  constructor() { }
  writeValue(v: any): void {
    this.value = v;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

  setDisabledState?(isDisabled: boolean): void {

  }

  public SelecionarImagem(): void {
    this.inputImg.nativeElement.click()
  }

  public RemoverImagem(): void {
    this.value = "";
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.value = event.target.result;
        //console.log(event.target.result)
      }
    }
  }


}

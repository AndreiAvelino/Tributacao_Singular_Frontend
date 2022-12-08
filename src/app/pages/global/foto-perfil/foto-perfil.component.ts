import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FotoService } from 'src/services/foto.service';
import { LocalStorageService } from 'src/services/local-storage.service';

export interface FotoUsuario {
  Id: String,
  Src: File,
  idUsuario: String
}

@Component({
  selector: 'app-foto-perfil',
  templateUrl: './foto-perfil.component.html',
  styleUrls: ['./foto-perfil.component.scss']
})
export class FotoPerfilComponent implements OnInit {

  public formulario: FormGroup
  public usuario;

  constructor(
    private formBuilder: FormBuilder,
    private fotoUsuarioService: FotoService,
    private _localStorage: LocalStorageService,
    private _snackBar: MatSnackBar) 
  {}

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      Id: "00000000-0000-0000-0000-000000000000",
      idUsuario: this._localStorage.get_user_id(),
      Src: ""
    })

    this.RecuperarFoto();
  }

  public RecuperarFoto(): void {
    this.fotoUsuarioService.get(this._localStorage.get_user_id()).toPromise()
      .then(r => {
        if(r.data){
          this.formulario.patchValue({
            Src: r.data.src,
            Id: r.data.id,
            idUsuario: r.data.idUsuario
          })
        }
      })
  }

  async RemoverFoto(): Promise<void> {

    if(this.formulario.value.Id != "00000000-0000-0000-0000-000000000000"){
      await this.fotoUsuarioService.delete(this.formulario.value.Id).toPromise()
        .then(() => {})
        .catch(e => console.log(e))
    }

    this.LimparFormulario();
    this._snackBar.open("Foto removida!", 'Fechar'); 

  }

  async EnviarFoto(): Promise<void> {

    await this.fotoUsuarioService.post(this.formulario.value).toPromise()
      .then(res => {
        this._snackBar.open("Upload realizado com sucesso", 'Fechar'); 
      },
      err => {
        this._snackBar.open("Ocorreu um erro!", 'Fechar'); 
      })

    this.fotoUsuarioService.get(this._localStorage.get_user_id()).toPromise()
      .then(r => {
        this.formulario.patchValue({
          Id: r.data.id
        })
      })
  }

    // public AlterarFoto(): void {
  //   this.fotoUsuarioService.put(this.formulario.value).toPromise()
  //     .then(r => console.log(r))
  //     .catch(e => console.log(e))
  // }

  public LimparFormulario(): void {
    this.formulario.patchValue({
      Id: "00000000-0000-0000-0000-000000000000",
      idUsuario: this._localStorage.get_user_id(),
      Src: ""
    })
  }

  public HabilitaBotaoEnviar(): boolean {
    if(this.formulario.value.Id == "00000000-0000-0000-0000-000000000000" && this.formulario.value.Src != ""){
      return false;
    }

    return true;
  }
  
  public mostrarMensagem(r): void{
    if(typeof(r.data) == 'string'){
      this._snackBar.open(r.data, 'Fechar');   
    } else {
      this._snackBar.open("Operação realizada com sucesso", 'Fechar');   
    }  
  }
}

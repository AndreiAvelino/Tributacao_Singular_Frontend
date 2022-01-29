import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

interface Info{
  titulo: string,
  mensagem: string,
  positivo: string,
  negativo: string
}

@Component({
  selector: 'app-confirm-page',
  templateUrl: './confirm-page.component.html',
  styleUrls: ['./confirm-page.component.css']
})
export class ConfirmPageComponent {

  public info: Info = {
    titulo: "",
    mensagem: "",
    positivo: "",
    negativo: ""
  };
  
  constructor(@Inject(MAT_DIALOG_DATA) data,
              public dialog: MatDialog,
              private dialogRef: MatDialogRef<ConfirmPageComponent>) {

      this.info.mensagem = data.mensagem
      this.info.titulo = data.titulo ? data.titulo : "Portal do cliente informa:"
      this.info.positivo = data.positivo ? data.positivo : "Sim"
      this.info.negativo = data.negativo ? data.negativo : "Não"
  }
  
  public Resposta(resposta: boolean) {
    this.dialogRef.close(resposta)
  }

}

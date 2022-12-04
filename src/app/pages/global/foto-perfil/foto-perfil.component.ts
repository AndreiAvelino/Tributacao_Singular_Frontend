import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-foto-perfil',
  templateUrl: './foto-perfil.component.html',
  styleUrls: ['./foto-perfil.component.scss']
})
export class FotoPerfilComponent implements OnInit {

  public formulario: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      Id: 0,
      idUsuario: "",
      Photo: ""
    })
  }

  public EnviarFoto(): void {
    console.log(this.formulario.value)
  }

}

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from 'src/services/local-storage.service';
import { ProdutoService } from 'src/services/produto.service';

@Component({
  selector: 'app-adicionar-arquivo-produto',
  templateUrl: './adicionar-arquivo-produto.component.html',
  styleUrls: ['./adicionar-arquivo-produto.component.scss']
})
export class AdicionarArquivoProdutoComponent implements OnInit {
  
  private listaProdutosAdicionar;
  public arquivo;

  constructor(private _localStorage: LocalStorageService,
              private _produtoService: ProdutoService,
              private _location: Location,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  public AbrirCaixaArquivos() {
    document.getElementById('selectFiles').click();
  }

  async ArquivosSelecionados(arquivos: any) {
    this.arquivo = arquivos[0].name
  }

  public upload(){
  
    var files = (<HTMLInputElement>document.getElementById('selectFiles')).files;
      
    if (files.length <= 0) {
      return false;
    }
    
  
    var fr = new FileReader();

    fr.onload = e => {
      let result = JSON.parse(<string> e.target.result);

      for(let i = 0; i < result.length; i++){
        result[i]['id'] = '00000000-0000-0000-0000-000000000000'
        result[i]['clienteId'] = this._localStorage.get_user_id()
        result[i]['categoriaId'] = '00000000-0000-0000-0000-000000000000'
      }

      this.listaProdutosAdicionar = result;

      this._produtoService.post({
        produtoViewModels: this.listaProdutosAdicionar
      })
        .toPromise()
        .then(r => {
          this.mostrarMensagem(r)
          this.voltar()
        })
        .catch(e => this.mostrarErros(e))
    }
  
    
  
    fr.readAsText(files.item(0));
  };

  public ExcluirArquivo(){
    (<HTMLInputElement>document.getElementById('selectFiles')).value = ""
    this.arquivo = "";

  }

  public mostrarErros(e): void{
    if(e.error){
      var erros = <Array<string>> (Object.values(e.error.errors))  
      for(let i = 0; i < erros.length; i++){
        this._snackBar.open(erros[i], 'Fechar');
      }
    } else {
      this._snackBar.open(e.message, 'Fechar');
    } 
  }

  public mostrarMensagem(r): void{
    this._snackBar.open(r.data, 'Fechar');    
  }

  public voltar(): void{
    this._location.back();
   }

}

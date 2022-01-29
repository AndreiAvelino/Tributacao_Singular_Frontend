import { Component, OnInit } from '@angular/core';
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
              private _produtoService: ProdutoService) { }

  ngOnInit(): void {
  }

  public AbrirCaixaArquivos() {
    console.log((<HTMLInputElement>document.getElementById('selectFiles')).files)
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

    console.log(this._localStorage.get_user_id())

    fr.onload = e => {
      console.log(e.target.result)
      let result = JSON.parse(<string> e.target.result);

      for(let i = 0; i < result.length; i++){
        result[i]['id'] = '00000000-0000-0000-0000-000000000000'
        result[i]['clienteId'] = this._localStorage.get_user_id()
        result[i]['categoriaId'] = '00000000-0000-0000-0000-000000000000'
      }

      this.listaProdutosAdicionar = result;
      console.log(this.listaProdutosAdicionar)

      this._produtoService.post({
        produtoViewModels: this.listaProdutosAdicionar
      })
        .toPromise()
        .then(r => console.log(r))
        .catch(e => console.log(e))
    }
  
    
  
    fr.readAsText(files.item(0));
  };

  public ExcluirArquivo(){
    (<HTMLInputElement>document.getElementById('selectFiles')).value = ""
    this.arquivo = "";

  }

}

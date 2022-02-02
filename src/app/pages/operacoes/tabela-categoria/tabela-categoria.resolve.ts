import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { CategoriaService } from "src/services/categoria.service";
import { Categoria } from "./tabela-categoria.component";


@Injectable({
    providedIn: 'root'
})

export class TabelaCategoriaResolve implements Resolve<any> {

    // private categorias: Array<Categoria> = [
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "arroz",
    //       icms: 35,
    //       cofins: 100,
    //       ipi: 25
    //     },
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "feijao",
    //       icms: 66,
    //       cofins: 14,
    //       ipi: 81
    //     },    
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "batata",
    //       icms: 10,
    //       cofins: 1020,
    //       ipi: 1
    //     },    
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "couve",
    //       icms: 51,
    //       cofins: 481,
    //       ipi: 115
    //     },    
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "aipim",
    //       icms: 2,
    //       cofins: 3,
    //       ipi: 4
    //     },
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "arroz",
    //       icms: 35,
    //       cofins: 100,
    //       ipi: 25
    //     },
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "feijao",
    //       icms: 66,
    //       cofins: 14,
    //       ipi: 81
    //     },    
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "batata",
    //       icms: 10,
    //       cofins: 1020,
    //       ipi: 1
    //     },    
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "couve",
    //       icms: 51,
    //       cofins: 481,
    //       ipi: 115
    //     },    
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "aipim",
    //       icms: 2,
    //       cofins: 3,
    //       ipi: 4
    //     },
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "arroz",
    //       icms: 35,
    //       cofins: 100,
    //       ipi: 25
    //     },
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "feijao",
    //       icms: 66,
    //       cofins: 14,
    //       ipi: 81
    //     },    
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "batata",
    //       icms: 10,
    //       cofins: 1020,
    //       ipi: 1
    //     },    
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "couve",
    //       icms: 51,
    //       cofins: 481,
    //       ipi: 115
    //     },    
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "aipim",
    //       icms: 2,
    //       cofins: 3,
    //       ipi: 4
    //     },
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "arroz",
    //       icms: 35,
    //       cofins: 100,
    //       ipi: 25
    //     },
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "feijao",
    //       icms: 66,
    //       cofins: 14,
    //       ipi: 81
    //     },    
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "batata",
    //       icms: 10,
    //       cofins: 1020,
    //       ipi: 1
    //     },    
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "couve",
    //       icms: 51,
    //       cofins: 481,
    //       ipi: 115
    //     },    
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "aipim",
    //       icms: 2,
    //       cofins: 3,
    //       ipi: 4
    //     },
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "arroz",
    //       icms: 35,
    //       cofins: 100,
    //       ipi: 25
    //     },
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "feijao",
    //       icms: 66,
    //       cofins: 14,
    //       ipi: 81
    //     },    
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "batata",
    //       icms: 10,
    //       cofins: 1020,
    //       ipi: 1
    //     },    
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "couve",
    //       icms: 51,
    //       cofins: 481,
    //       ipi: 115
    //     },    
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "aipim",
    //       icms: 2,
    //       cofins: 3,
    //       ipi: 4
    //     },
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "arroz",
    //       icms: 35,
    //       cofins: 100,
    //       ipi: 25
    //     },
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "feijao",
    //       icms: 66,
    //       cofins: 14,
    //       ipi: 81
    //     },    
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "batata",
    //       icms: 10,
    //       cofins: 1020,
    //       ipi: 1
    //     },    
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "couve",
    //       icms: 51,
    //       cofins: 481,
    //       ipi: 115
    //     },    
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "aipim",
    //       icms: 2,
    //       cofins: 3,
    //       ipi: 4
    //     },
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "arroz",
    //       icms: 35,
    //       cofins: 100,
    //       ipi: 25
    //     },
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "feijao",
    //       icms: 66,
    //       cofins: 14,
    //       ipi: 81
    //     },    
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "batata",
    //       icms: 10,
    //       cofins: 1020,
    //       ipi: 1
    //     },    
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "couve",
    //       icms: 51,
    //       cofins: 481,
    //       ipi: 115
    //     },    
    //     {
    //       id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       descricao: "aipim",
    //       icms: 2,
    //       cofins: 3,
    //       ipi: 4
    //     },
    //   ]

    private categorias;

    constructor(private _categoriaService: CategoriaService) {}

    async resolve() {
        
        await this.get_categorias();

        return {categorias: this.categorias}
    }

    async get_categorias(){
        await this._categoriaService.get_all()
            .toPromise()
            .then(r => this.categorias = r.data)
    }

}
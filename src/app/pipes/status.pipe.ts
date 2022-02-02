import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: string): unknown {

    switch(String(value)){
      case "0": return "Pendente"
      case "1": return "Atualizado"
      case "2": return "Revisado"
      default: return value
    }

  }

}

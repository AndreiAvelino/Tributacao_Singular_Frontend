import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SuperTableService {

  @Output() reset = new EventEmitter()

  constructor() { }

  public resetar(): void {
    this.reset.emit(true)
  }
}

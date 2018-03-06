import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ModalService {

  currentModal: Subject<string>;

  constructor() {
    this.currentModal = new Subject();
  }

  openModal(modalName: string): void {
    this.currentModal.next(modalName);
  }

  closeModal(): void {
    this.currentModal.next(null);
  }

}

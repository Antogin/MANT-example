import { Component, OnInit } from '@angular/core';
import {ModalService} from './modal.service';
import {MODAL_NAME} from './modal-name';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  modalName: string;
  modalNames = MODAL_NAME;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.modalService.currentModal.subscribe((modalName) => {
      this.modalName = modalName;
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }
}

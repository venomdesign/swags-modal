import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalButton, ModalService, Modal } from '@ui/shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'ui-kit';

  constructor(private modal: ModalService) {}

  open() {
    const buttons: ModalButton<boolean>[] = [
      { label: 'Close', style: 'secondary', closeOnClick: true },
      { label: 'Ok', style: 'primary', closeOnClick: true, disabled: true },
    ];

    this.modal.open(Modal, {
      width: '350px',
      buttons,
    });
  }
}

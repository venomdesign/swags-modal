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
      { label: 'Back', style: 'destructive', closeOnClick: false, disabled: false, alignment: 'left', action: () => console.log('Back Clicked') },
      { label: 'Left', style: 'secondary', closeOnClick: false, disabled: false, alignment: 'left', action: () => console.log('Left Clicked') },
      { label: 'Close', style: 'tertiary', closeOnClick: true },
      { label: 'Primary Disabled', style: 'success', closeOnClick: false, disabled: true },
    ];

    this.modal.open(Modal, {
      width: '500px',
      buttons,
    });
  }
}

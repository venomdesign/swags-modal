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
      { label: 'Back', style: 'destructive', closeOnClick: false, disabled: false, action: () => console.log('Back Clicked') },
      { label: 'Left', style: 'secondary', closeOnClick: false, disabled: false, alignment: 'left', action: () => this.alertSomething() },
      { label: 'Close', style: 'tertiary', closeOnClick: true },
      { label: 'Primary', style: 'success', closeOnClick: false, disabled: false, alignment: 'left' },
    ];

    this.modal.open(Modal, {
      width: '500px',
      type: 'alert',
      buttons,
    });
  }
  alertSomething() {
    console.log('MFE suck');
  }
}

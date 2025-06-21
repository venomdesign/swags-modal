import { Component, TemplateRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalButton, ModalService, Modal } from '@ui/shared';
import { ModalBootstrap } from '../../../shared/src/lib/modal-bootstrap/modal-bootstrap';
import { ModalButtons } from '@ui/shared/lib/modal-bootstrap/modal-button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ModalBootstrap],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'ui-kit';
  @ViewChild('productDetails', { static: true }) productDetails!: TemplateRef<any>;
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
      title: 'Swag\'s Global Config Modal',
      bodyTemplate: this.productDetails,
      type: '',
    });
  }

  consoleClick() {
    console.log('clicked');
  }

  /** bootstrap **/
  showModal = false;

  modalButtons: ModalButtons[] = [
    {
      label: 'OK',
      style: 'primary',
      closeOnClick: true,
      alignment: 'left',
      action: (modal, data) => {
        alert('OK clicked!');
        // modal.close(); // Not needed if closeOnClick is true
      },
    },
    {
      label: 'Cancel',
      style: 'secondary',
      closeOnClick: true,
    },
  ];

  openModal() {
    this.showModal = true;
  }

  onModalClosed(result: any) {
    this.showModal = false;
    console.log('Modal closed with:', result);
  }
}

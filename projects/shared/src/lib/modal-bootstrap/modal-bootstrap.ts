import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalButtons } from './modal-button';
import { ModalConfig } from './modal-config';

@Component({
  standalone: true,
  selector: 'ui-modal-bootstrap',
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss'],
})
export class ModalBootstrap<D = any, R = any> {
  @Input() title = 'Modal';
  @Input() buttons: ModalButtons<R, D>[] = [];
  @Input() bodyTemplate?: TemplateRef<any>;
  @Input() config?: ModalConfig<D, R>;
  @Input() data?: D;
  @Input() type?: string;
  @Input() show = false;
  @Output() closed = new EventEmitter<R | undefined>();

  ngOnInit(): void {
    if (this.config) {
      if (!this.buttons.length && this.config.buttons) {
        this.buttons = this.config.buttons as ModalButtons<R, D>[];
      }
      if (!this.bodyTemplate && this.config.bodyTemplate) {
        this.bodyTemplate = this.config.bodyTemplate;
      }
      if (this.config.title) {
        this.title = this.config.title;
      }
      if (this.config.type) {
        this.type = this.config.type;
      }
      if (this.config.data) {
        this.data = this.config.data;
      }
    }
  }

  get leftAligned(): boolean {
    return this.buttons?.some(b => b.alignment === 'left');
  }

  run(btn: ModalButtons<R, D>): void {
    if (btn.disabled instanceof Function && btn.disabled(this.data!)) return;
    if (typeof btn.action === 'function') {
      Promise.resolve(btn.action({ close: (r?: R) => this.close(r) } as any, this.data!)).finally(() => {
        if (btn.closeOnClick) this.close();
      });
    } else if (btn.closeOnClick) {
      this.close();
    }
  }

  isDisabled(btn: ModalButtons<R, D>): boolean {
    return typeof btn.disabled === 'function'
      ? btn.disabled(this.data!)
      : !!btn.disabled;
  }

  close(result?: R): void {
    this.show = false;
    this.closed.emit(result);
  }
} 
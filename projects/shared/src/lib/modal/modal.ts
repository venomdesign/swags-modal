import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  Input,
  Optional,
  SkipSelf,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ModalRef,
  MODAL_DATA,
  MODAL_CFG,
  ModalConfig,
  ModalButton,
} from '@ui/shared';

@Component({
  standalone: true,
  selector: 'ui-modal',
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modal<D = any, R = any> {
  @Input() title = 'Modal';
  @Input() buttons: ModalButton<R, D>[] = [];
  @Input() bodyTemplate?: TemplateRef<any>;

  constructor(
    public modal: ModalRef<R>,
    @Inject(MODAL_DATA) public data: D,
    @Inject(MODAL_CFG) public cfg: ModalConfig<D, R>
  ) {}

  ngOnInit(): void {
    if (!this.buttons.length && this.cfg?.buttons) {
      this.buttons = this.cfg.buttons as ModalButton<R, D>[];
    }
    if (!this.bodyTemplate && this.cfg?.bodyTemplate) {
      this.bodyTemplate = this.cfg.bodyTemplate;
    }
    if (this.cfg?.title) {
      this.title = this.cfg.title;
    }
  }

  get leftAligned(): boolean {
    return this.buttons?.some(b => b.alignment === 'left');
  }

  /* helper so template stays tidy */
  run(btn: ModalButton<R, D>): void {
    if (btn.disabled instanceof Function && btn.disabled(this.data)) return;
    if (typeof btn.action === 'function') {
      Promise.resolve(btn.action(this.modal, this.data)).finally(() => {
        if (btn.closeOnClick) this.modal.close();
      });
    } else if (btn.closeOnClick) {
      this.modal.close();
    }
  }

  isDisabled(btn: ModalButton<R, D>): boolean {
    return typeof btn.disabled === 'function'
      ? btn.disabled(this.data)
      : !!btn.disabled;
  }
}

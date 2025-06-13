import { Injectable, Injector, Type } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { filter } from 'rxjs/operators';
import { ModalConfig, ModalRef, MODAL_DATA, MODAL_CFG } from '@ui/shared';

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open<T, D = any, R = any>(
    component: Type<T>,
    config: ModalConfig<D> = {}
  ): ModalRef<R> {
    const overlayRef = this.overlay.create(this.createOverlayCfg(config));
    const modalRef = new ModalRef<R>(overlayRef);

    const injector = Injector.create({
      providers: [
        { provide: ModalRef, useValue: modalRef },
        { provide: MODAL_DATA, useValue: config.data },
        { provide: MODAL_CFG, useValue: config },
      ],
      parent: this.injector,
    });

    overlayRef.attach(new ComponentPortal(component, null, injector));

    if (!config.disableClose) {
      overlayRef.backdropClick().subscribe(() => modalRef.close());
      overlayRef
        .keydownEvents()
        .pipe(filter((e) => e.key === 'Escape'))
        .subscribe(() => modalRef.close());
    }
    return modalRef;
  }

  /* ---------- helpers ---------- */
  private createOverlayCfg(cfg: ModalConfig): OverlayConfig {
    const pos = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    if (cfg.position) {
      pos
        .top(cfg.position.top ?? '')
        .left(cfg.position.left ?? '')
        .right(cfg.position.right ?? '')
        .bottom(cfg.position.bottom ?? '');
    }

    return new OverlayConfig({
      width: cfg.width,
      height: cfg.height,
      maxWidth: cfg.maxWidth ?? '80vw',
      panelClass: cfg.panelClass ?? 'besa-modal',
      backdropClass: cfg.backdropClass ?? 'modal-backdrop',
      hasBackdrop: cfg.hasBackdrop !== false,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: pos,
    });
  }
}

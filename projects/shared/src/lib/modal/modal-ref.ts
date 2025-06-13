import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

export class ModalRef<R = any> {
  private readonly closed$ = new Subject<R | undefined>();
  readonly afterClosed = this.closed$.asObservable();

  constructor(private overlayRef: OverlayRef) {}

  close(result?: R): void {
    this.overlayRef.dispose();
    this.closed$.next(result);
    this.closed$.complete();
  }
}

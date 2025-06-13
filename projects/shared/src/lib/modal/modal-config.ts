import { ModalButton } from '@ui/shared';

export interface ModalConfig<D = any, R = any> {
  width?: string;
  height?: string;
  maxWidth?: string | number;
  panelClass?: string | string[];
  backdropClass?: string | string[];
  hasBackdrop?: boolean;
  disableClose?: boolean;
  data?: D;
  position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  buttons?: ModalButton<R, D>[];
}

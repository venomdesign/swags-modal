import { ModalRef } from '@ui/shared';

export interface ModalButton<R = any, D = any> {
  /** What the button shows */
  label: string;
  /** Bootstrap flavour – primary | secondary | danger | … */
  style?: string;
  /** Optional Font-Awesome or custom icon class */
  icon?: string;
  /** If true, modal closes automatically after click (default = false) */
  closeOnClick?: boolean;
  /** Alignment, buttons show up on the left or right of the modal **/
  alignment?: string;
  /** order, order your buttons in the modal **/
  // order?: number; // actually dont need the order is based off the order in the ts file
  /** Enable/disable dynamically – supports a function for live evaluation */
  disabled?: boolean | ((data: D) => boolean);
  /**
   * Your callback – run whatever you need.
   * You get the injected ModalRef (so you can close with a custom value)
   * and the same data object the modal received.
   * Async/Promise handlers are fully supported.
   */
  action?: (modal: ModalRef<R>, data: D) => void | Promise<void>;
}

export interface ModalButtons<R = any, D = any> {
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
  /** Enable/disable dynamically – supports a function for live evaluation */
  disabled?: boolean | ((data: D) => boolean);
  /**
   * Your callback – run whatever you need.
   * You get a close function and the same data object the modal received.
   * Async/Promise handlers are fully supported.
   */
  action?: (modal: { close: (result?: R) => void }, data: D) => void | Promise<void>;
}

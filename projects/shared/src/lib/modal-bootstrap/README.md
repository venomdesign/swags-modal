# Modal Bootstrap

This folder contains a Bootstrap-only Angular modal component (`ModalBootstrap`) that does not use Angular CDK or Overlay. It is designed for simpler use cases where you want to leverage Bootstrap's built-in modal styles and behaviors, and manage modal visibility via Angular bindings.

## Usage

- Import `ModalBootstrap` into your module or component.
- Use the `<ui-modal-bootstrap>` selector in your template.
- Control the modal's visibility with the `[show]` input.
- Pass configuration, buttons, and content via inputs or `bodyTemplate`.
- Listen to the `(closed)` output for close events.

## Differences from CDK Modal
- No dependency on Angular CDK or Overlay.
- No dependency injection or tokens; all data/config is passed via inputs.
- Modal visibility is controlled by the parent component.
- Uses Bootstrap's modal classes and structure.

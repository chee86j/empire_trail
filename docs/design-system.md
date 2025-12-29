# Design system

## Goals
- Keep UI consistent by centralizing tokens and shared styles.
- Maintain accessibility baselines (contrast, focus styles, touch targets).
- Make it easy to add new screens without inventing new styling conventions.

## Tokens
CSS variables live in `src/styles/design-system.css` under `:root`:
- Colors: `--primary-navy`, `--primary-gold`, semantic colors (success, warning, danger).
- Typography: font family and size scale.
- Spacing: `--spacing-*`.
- Radius, shadows, transitions, z-index values.

## Shared components (CSS primitives)
`src/styles/design-system.css` also defines reusable class-based primitives:
- Buttons: `.btn` plus variants like `.btn-primary`, `.btn-secondary`, `.btn-success`, `.btn-danger`.
- Cards: `.card` for consistent panel styling.

## Adding new UI
When adding a new screen or component:
- Prefer existing tokens and primitives before adding new colors/sizing.
- If a token must be added, define it in `:root` and use it consistently.
- Ensure interactive elements meet minimum touch target sizes.


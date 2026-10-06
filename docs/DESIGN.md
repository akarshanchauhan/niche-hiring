# Attio — Style Reference
> Precision Digital Toolkit. A design system built on a foundation of high-contrast monochrome, where soft serif headlines provide a human touch to a clinical, tool-like interface.

**Theme:** light

The design feels like a meticulously organized, high-end instrument. It operates on a starkly minimalist, black-and-white axis, where near-black (#1c1d1f) on pure white is the default state for text and primary actions. The most distinctive choice is the typographic duality: large, inviting headlines are set in the soft serif Newsreader / Tiempos Text, while the entire user interface, from buttons to body copy, uses the neutral sans-serif Inter. This creates a rhythm between approachable storytelling and functional precision. Color is used with extreme restraint, appearing as subtle accents for interactive states (Action Blue #407ff2) or status indicators, ensuring the user's focus remains on content and functionality. A consistent 10px radius on buttons provides a soft counterpoint to the otherwise sharp, grid-aligned 8px UI frames.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| White | `#ffffff` | `--color-white` | Primary page background, card surfaces, text on dark surfaces |
| Ash | `#f3f4f6` | `--color-ash` | Subtle background panels, table headers, button pressed state |
| Stone | `#e4e7ec` | `--color-stone` | Light borders, dividers, subtle card boundaries |
| Slate | `#d3d8df` | `--color-slate` | Default borders, inactive UI elements, input borders |
| Lead | `#b5bdc9` | `--color-lead` | Placeholder text, disabled text |
| Overcast | `#8f99a8` | `--color-overcast` | Secondary body text, supporting labels |
| Metal | `#6f7988` | `--color-metal` | Tertiary body text, icons, navigation links |
| Carbon | `#505967` | `--color-carbon` | Icons, subtle interactive elements |
| Ink | `#1c1d1f` | `--color-ink` | Primary text, headlines, primary button background |
| Abyss | `#000000` | `--color-abyss` | High-contrast accents |
| Action Blue | `#407ff2` | `--color-action-blue` | Links, active state indicators — injection of color for interactivity |
| Focus Blue | `#94b9ff` | `--color-focus-blue` | Focus rings and glows on interactive elements |
| Success Green | `#075a39` | `--color-success-green` | Status indicators, success notifications |
| Danger Red | `#b91c1c` | `--color-danger-red` | Error messages, destructive action indicators |
| Warning Yellow | `#b45309` | `--color-warning-yellow` | Warning notifications, status indicators |

## Tokens — Typography

### Newsreader / Tiempos Text — Soft Serif for Display Headlines
- **Family:** `'Newsreader', 'Lora', Georgia, serif`
- **Weights:** 400, 500
- **Sizes:** 24px, 28px, 32px, 40px
- **Role:** Used for page headers, modal titles, and generated document artifacts to add a soft, human, and editorial quality that contrasts with the functional UI.

### Inter — Precision Workhorse Sans-serif for UI
- **Family:** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Weights:** 400, 500, 600
- **Sizes:** 11px, 12px, 13px, 14px, 15px, 16px
- **Role:** The foundation of the user interface: body copy, navigation, tables, buttons, metrics, and labels.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| caption | 12px | 1.5 | -0.14px | `--text-caption` |
| body-sm | 13px / 14px | 1.43 | -0.14px | `--text-body-sm` |
| body | 15px / 16px | 1.5 | -0.24px | `--text-body` |
| subheading | 18px / 20px | 1.3 | -0.4px | `--text-subheading` |
| heading-sm | 24px / 28px | 1.23 | -0.42px | `--text-heading-sm` |
| heading | 32px / 40px | 1.1 | -0.6px | `--text-heading` |

## Tokens — Spacing & Shapes

**Density:** compact & structured

### Border Radius
| Element | Value |
|---------|-------|
| cards | 8px |
| inputs | 8px |
| buttons | 10px |
| tags / badges | 6px |
| tabs | 0px |
| search bar / pills | 9999px |

### Shadows
| Name | Value | Token |
|------|-------|-------|
| UI Frame Card | `rgba(28, 40, 64, 0.08) 0px 2px 4px -2px, rgba(28, 40, 64, 0.04) 0px 4px 6px -2px` | `--shadow-ui-frame-card` |
| Input Focus | `0 0 0 3px color-mix(in srgb, #94b9ff 40%, transparent)` | `--shadow-input-focus` |
| Drawer / Modal | `rgba(28, 40, 64, 0.15) 0px 12px 32px -4px` | `--shadow-modal` |

## Components

### Primary CTA Button
Background: Ink (`#1c1d1f`), Text: White (`#ffffff`), Font: 14px Inter weight 500, Padding: 8px 14px, Border: 1px solid `#1c1d1f`, Radius: 10px. Hover: `#2b2d31`.

### Secondary CTA Button
Background: White (`#ffffff`), Text: Ink (`#1c1d1f`), Font: 14px Inter weight 500, Padding: 8px 14px, Border: 1px solid Slate (`#d3d8df`), Radius: 10px. Hover: Ash (`#f3f4f6`).

### Hairline Ghost Button
Background: transparent, Text: Metal (`#6f7988`), Font: 13px/14px Inter weight 500, Padding: 6px 12px, Radius: 10px. Hover: Ash (`#f3f4f6`), Text: Ink (`#1c1d1f`).

### UI Frame Card
Background: White (`#ffffff`), Border: 1px solid Stone (`#e4e7ec`), Radius: 8px, Shadow: `--shadow-ui-frame-card`.

### Feature Tab Bar
Background: transparent, Text: Metal (`#6f7988`), Font: 14px Inter weight 500, Padding: 8px 16px, Radius: 0px. Active state: Ink (`#1c1d1f`) text with 2px bottom border of Ink (`#1c1d1f`).

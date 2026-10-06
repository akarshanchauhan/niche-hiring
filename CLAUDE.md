# CLAUDE.md — Architecture & Engineering Guide

## Project Overview
High-fidelity, clickable prototype for the Niche HR Proactive Talent Intelligence Platform, designed for HR teams conducting proactive recruitment for specialized, cross-disciplinary roles (e.g. Statistical Economists specializing in Weather Patterns).

## Core References
- `docs/DESIGN.md`: Visual language source of truth (**Attio — Precision Digital Toolkit: Editorial Light Mode**).
- `docs/wireframes/`: Functional and structural source of truth (10 low-fidelity annotated wireframe screens).
- `docs/PLAN.md`: Complete implementation plan, screen state inventory, and flow map.

## Tech Stack
- **Framework:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4 using `@theme` in `src/styles/index.css`
- **Routing:** React Router v7 (with SPA static fallback in `public/_redirects`)
- **Icons:** Monochrome SVG icon primitives in `src/components/ui/Icons.tsx` (stroke ~1.75px, no emojis, no placeholder icons)
- **Testing:** Playwright (`npx playwright test`)

## Key Design & Interaction Rules
1. **Surfaces & Colors:**
   - Canvas: Pure white (`#ffffff`) or subtle off-white (`#fafbfc`).
   - Panels / Containers: Ash (`#f3f4f6`) for table headers, metric wells, stepper container.
   - Borders: Stone (`#e4e7ec`) for cards, dividers, and boundaries; Slate (`#d3d8df`) for inputs and secondary button borders.
   - Text: Ink (`#1c1d1f`) for primary text and headlines; Overcast / Metal (`#8f99a8` / `#6f7988`) for secondary copy.
   - Primary CTA: Solid Ink (`#1c1d1f`) with white text and `10px` radius (`rounded-[10px]`).
   - Secondary CTA: White with slate border and `10px` radius.
   - Accents: Action Blue (`#407ff2`) for links and focus indicators.
2. **Typography Discipline:**
   - Soft Serif: `Newsreader` (`'Newsreader', 'Lora', Georgia, serif`) for display headers, page titles, and generated document artifacts.
   - Precision Sans: `Inter` for UI buttons, data tables, metrics, navigation, labels, and forms.
3. **Geometry:**
   - Buttons: Strictly `10px` radius.
   - Cards & Frames: Strictly `8px` radius with soft card elevation shadow (`rgba(28, 40, 64, 0.08) 0px 2px 4px -2px`).
   - Badges & Tags: `6px` radius.
   - Feature Tabs: `0px` radius with 2px solid `#1c1d1f` active bottom border.
4. **Accessibility:**
   - Focus ring: `2px solid #407ff2` with clean 2px offset.
   - Dialogs & Drawers trap focus and dismiss on `Escape`.
5. **Mock Data Separation:**
   - All data lives in `src/data/` (roles, jobDescriptions, idealProfiles, skillRanking, candidates, platforms). Never hardcoded inline inside components.
   - Platforms strictly follow wireframe labels (`Platform A` through `Platform F`).
   - All candidate names and research paper titles are fictional.
6. **Flow Behavior:**
   - Edit routes (`/search/:id/...`) return to candidate list and trigger the Stale Data warning banner.
   - Skill ranking changes immediately re-sort candidates by recalculated fit score.
   - "Re-run search" executes simulation, appends new candidates tagged "New", prepends a run chip ("Run 4, today"), and clears the stale banner.
   - "Save draft" exists on every wizard step and appears on the Dashboard with a resume action.
7. **Reviewer Demo Controls:**
   - Floating pill in bottom right corner or shortcut `Alt+D` / `Ctrl+Shift+D`.
   - Allows instant jumps to any screen, edge cases (Platform D failure, stale warning), fast-forward search, and state resets.

## Useful Commands
- `npm run dev`: Start local development server on port 5173
- `npm run build`: Typecheck and produce static production bundle in `dist/`
- `npm run preview`: Serve static production build on port 4173
- `npx playwright test`: Run visual verification test suite

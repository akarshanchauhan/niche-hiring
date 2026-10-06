# Attio Style — Niche HR Proactive Talent Intelligence Platform

A high-fidelity, clickable front-end prototype designed for HR and talent acquisition teams doing proactive hiring for specialized, cross-disciplinary roles (e.g., a statistical economist who specializes in weather patterns).

This prototype translates the visual design system from `docs/DESIGN.md` (**Attio — Precision Digital Toolkit: Editorial Light Mode**) into the structured interactive workflows specified in `docs/wireframes/`.

---

## 🎨 Design System: Attio Precision Digital Toolkit

- **Theme:** Clean, editorial light mode (`#ffffff`, `#fafbfc`, `#f3f4f6`).
- **Typography:**
  - Display / Headlines / Generated Artefacts: **Newsreader** soft serif (`'Newsreader', 'Lora', Georgia, serif`) for an approachable, human, editorial feel.
  - User Interface: **Inter** precision sans-serif (`'Inter', sans-serif`) for buttons, data tables, metrics, navigation, and inputs.
- **Color Roles:**
  - Ink (`#1c1d1f`): Primary headlines, body text, primary button backgrounds.
  - White (`#ffffff`): Page surface, card backgrounds, modal dialogs.
  - Ash (`#f3f4f6`): Subtle panels, table headers, metric wells, stepper container.
  - Stone (`#e4e7ec`): Light dividers and card boundaries.
  - Slate (`#d3d8df`): Default borders, input outlines.
  - Overcast / Metal (`#8f99a8` / `#6f7988`): Secondary body text, icon tints, metadata.
  - Action Blue (`#407ff2`): Focus rings, interactive link states.
  - Success Green (`#075a39`): Status indicators and verified badges.
  - Danger Red (`#b91c1c`): Destructive actions and platform error alerts.
  - Warning Yellow (`#b45309`): Stale warning banner and cautionary notices.
- **Geometry:**
  - Buttons: Strictly `10px` radius (`rounded-[10px]`).
  - Cards & Frames: Strictly `8px` radius (`rounded-[8px]`) with subtle Attio card elevation shadow (`rgba(28, 40, 64, 0.08) 0px 2px 4px -2px`).
  - Badges / Tags: `6px` radius (`rounded-[6px]`).
  - Feature Tabs: `0px` radius, 2px active bottom border in Ink (`#1c1d1f`).

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v20+` or `v24+`
- npm `v10+` or `v11+`

### Installation & Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **Produce production build:**
   ```bash
   npm run build
   ```
   Generates a static production bundle in `dist/`.

4. **Preview production build:**
   ```bash
   npm run preview
   ```
   Serves the static bundle locally on [http://localhost:4173](http://localhost:4173).

5. **Run automated Playwright visual verification suite:**
   ```bash
   npx playwright test
   ```
   Captures and validates full-page screenshots of every screen and state in `docs/screenshots/`.

---

## 📁 Project Structure

```
├── docs/
│   ├── DESIGN.md                 # Attio design language specification
│   ├── PLAN.md                   # Screen and state inventory, flow map & architecture
│   ├── wireframes/               # Source annotated low-fidelity screens
│   └── screenshots/              # Playwright-captured high-fidelity visual verification runs
├── public/
│   ├── _redirects                # Static SPA redirect configuration (Netlify / Cloudflare)
│   └── favicon.svg               # Monochrome SVG icon
├── src/
│   ├── components/
│   │   ├── ui/                   # Design token primitives (Buttons, Cards, Badges, Modals, Sliders, Stepper)
│   │   ├── layout/               # AppShell, Navigation, UserMenuModal, GlobalSettingsModal
│   │   ├── candidates/           # Candidate table, Shortlisted view, Detail drawer, Source preview, Stale banner
│   │   └── demo/                 # Reviewer Demo Controls drawer
│   ├── context/
│   │   └── SearchWorkflowContext.tsx # Central workflow state, reactive scoring, versioned localStorage
│   ├── data/                     # Domain-appropriate mock datasets (NOT inline in components)
│   │   ├── roles.ts              # Pre-configured searches & role templates
│   │   ├── jobDescriptions.ts    # Multi-version cross-disciplinary job descriptions
│   │   ├── idealProfiles.ts      # Multi-version candidate profile criteria
│   │   ├── skillRanking.ts       # Must-have and nice-to-have rankable factor definitions
│   │   ├── candidates.ts         # 48 fictional candidate records & re-run candidate pool
│   │   └── platforms.ts          # Platforms A through F connection configurations
│   ├── pages/
│   │   ├── Dashboard.tsx         # Search hub, draft searches, active background pipelines
│   │   ├── CandidatesView.tsx    # Candidates list, shortlist tab, filter runs, stale-data warning
│   │   └── wizard/               # Step1Requirement, Step2JobDescription, Step3IdealProfile, etc.
│   ├── styles/
│   │   └── index.css             # Tailwind v4 @theme token mapping & Attio styles
│   ├── App.tsx                   # Route declarations including dedicated edit routes
│   └── main.tsx                  # React 19 entry point
├── tests/
│   └── visual.spec.ts            # Playwright visual test suite
├── CLAUDE.md                     # Engineering and consistency reference guide
└── README.md                     # Documentation & prototype guide
```

---

## 🎛️ Reviewer Demo Controls

A discreet floating drawer is built into the prototype to allow immediate jumps to states and edge cases that are hard to reach naturally without engineering them.

- **Trigger:** Click the **Demo Controls** floating pill in the bottom-right corner, or press `Alt+D` (or `Ctrl+Shift+D`).
- **Capabilities:**
  1. **Instant Screen Jumps:**
     - 1. Dashboard / Home (4 active searches)
     - 2. Step 1: Role Requirement (Filled with Statistical Economist & uploads)
     - 3. Step 2: Job Description Review (AI chat + document viewer)
     - 4. Step 3: Ideal Candidate Profile (Interactive tags & versioning)
     - 5. Step 4: Skill Ranking (Drag-and-drop & factor promotion)
     - 6. Step 5: Search Setup (Fit slider & schedule configuration)
     - 7. Step 5.1: Live Searching In-Progress (Staged platform status)
     - 8. Step 6: Candidates Shortlist (48 candidate profiles)
  2. **Dedicated Edit Routes:**
     - `/search/statistical-economist-weather/skill-ranking`
     - `/search/statistical-economist-weather/ideal-profile`
     - `/search/statistical-economist-weather/job-description`
  3. **Edge Cases & Failure Simulations:**
     - **Fast-forward search to 100%:** Instantly finishes search simulation.
     - **Simulate Platform D Failure (Frame 128):** Injects a network error state with a working "Retry" action.
     - **Trigger Stale Ranking Banner (Screen 8 / Frame 130):** Displays the warning banner notifying the user that ranking changed and candidates need a re-run.
     - **Test 0 Searches Empty State:** Clears dashboard searches to inspect onboarding.
     - **Reset All State:** Restores versioned `localStorage` to pristine factory defaults.

---

## 🧪 What is Mocked & How It Behaves

1. **AI Processing:**
   - Simulated with realistic multi-phase feedback indicators (1–2 seconds per stage).
   - Suggestions pills ("Shorter", "More technical", "Plainer language") trigger simulated AI refinement.
2. **Platform Sourcing Engines:**
   - Generic platform names strictly matching wireframes: `Platform A`, `Platform B`, `Platform C`, `Platform D`, `Platform E`, `Platform F`.
   - Source previews (Frame 131) display a generic, verified candidate data extract modal rather than a lookalike of any real website.
3. **Reactive Re-sorting & Re-running:**
   - When skill ranking is modified, candidate match scores recalculate immediately and the list re-sorts descending by fit score.
   - Modifying inputs via edit routes returns to the candidate list with the **Stale Warning Banner** active.
   - Clicking **Re-run search 🔍** executes a search simulation, appends 3 new fictional candidates tagged with **New**, prepends a new run chip (`Run 4, today`), increments the "New since last run" count, and dismisses the stale banner.
4. **Draft Persistence:**
   - **Save draft** is present on every wizard step.
   - Saved drafts appear on the Dashboard with a **Resume draft** button that jumps directly back to the saved step.
5. **Fictional Data Integrity:**
   - All 48 candidates feature fictional names and fictional research paper titles (e.g. *“Nonlinear Pricing Sensitivity in Regional Energy Grids under Extreme Heat Anomalies”*).

---

## 💡 Key Design Decisions & Smallest Sensible Behaviors

Where the wireframes referenced elements without drawing their detailed destination, the smallest sensible behavior was implemented:

1. **Avatar Menu (Top Right):**
   - Minimal modal popover displaying user credentials (*Akarshan / Lead Talent Partner*), active workspace, and a link to manage platform connections.
2. **Global Platform Connections Settings:**
   - Slide-over/modal showing synchronization health across Platform A–F, with active reconnect actions for Platform E (expired) and connect for Platform F (disconnected).
3. **Dashboard CTA Banners (Frame 115):**
   - Banner 1: Automated Search Pipelines overview with "View latest matches" and "Dismiss".
   - Banner 2: Platform Connections health with "Manage platforms" and "Dismiss".
4. **"View All" Job Descriptions (Frame 117):**
   - Modal listing saved and archived job descriptions allowing instant prefilling of the Step 1 requirement wizard.
5. **Share Flows (Job Description, Profile, Candidates):**
   - Accessible Share modal providing an instant "Copy Link" action (with copy confirmation toast) and team permission toggles (Can view, Can comment, Can edit).
6. **Focus Indicator Accessibility:**
   - Action blue focus ring (`outline: 2px solid #407ff2; outline-offset: 2px;`) across all interactive elements.

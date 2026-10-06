# Implementation Plan: Niche HR Proactive Talent Intelligence Platform

A high-fidelity, clickable front-end prototype for proactive hiring of specialized, cross-disciplinary roles (e.g., statistical economists specializing in weather patterns). 

This plan translates the low-fidelity wireframes in `docs/wireframes/` into the visual language specified in `docs/DESIGN.md` ("Dimension — dusk-lit workspace with frosted glass panels"), incorporating all approved requirements and refined product behaviors.

---

## 1. Screen and State Inventory

| Wireframe Reference | Screen Name | Route | Key States & Variations |
|---|---|---|---|
| **1-Dashboard / Home** (Screenshot 2026-10-06 215536) | Dashboard / Search Hub | `/` or `/dashboard` | • **Default**: Displays "Welcome Akarshan", 4 active cross-disciplinary searches with metrics (candidates, new badges, shortlisted, last updated), and 2 CTA banners.<br>• **Draft Searches**: Shows saved drafts from any wizard step with a prominent "Resume" action.<br>• **Empty State**: Displays an onboarding state when all searches are cleared.<br>• **Background Search Active**: Search card showing animated pulsating status and "Analyzing sources..." when the user opted to "Leave and notify me". |
| **2-Requirement & 2.1-Requirement (filled)** (Screenshot 2026-10-06 215543 & 215550) | Step 1: Role Requirement Wizard | `/search/new/requirement` | • **Empty Form**: Stepper active on step 1; vague natural language textarea; document upload dropzone; expected opening date picker; list of previous job descriptions to clone.<br>• **Cloning Existing Role (Frame 117)**: Clicking an existing card ("Bioinformatics lead", "Statistical economist", "Computational linguist") or choosing from "View all" prefills the prompt and metadata.<br>• **Filled Form**: Populated with statistical economist text; 2 uploaded files (`Hiring_request.pdf`, `meeting_notes.png`) with View/Remove actions; enabled "Save draft" and "Generate job description →".<br>• **AI Generating State**: Multi-stage progress indicator ("Parsing requirement...", "Synthesizing cross-disciplinary links...", "Drafting JD...") transitioning to Step 2. |
| **3-Job description** (Screenshot 2026-10-06 215558) | Step 2: Job Description Review & AI Copilot | `/search/new/job-description`<br>`/search/:id/job-description` | • **Draft / Review**: Left pane shows conversational history, prompt bubble, attachment chips, and suggestion pills ("Shorter", "More technical", "Plainer language"). Right pane displays generated JD.<br>• **Interactive Editing**: Click-to-edit inline text across Title, Summary, What you will do, Required qualifications, Nice to have.<br>• **Section Commenting (Frame 123)**: Hovering over sections reveals a contextual comment trigger to steer AI changes.<br>• **Versioning**: Version dropdown ("Version 1", "Version 2") with revert support.<br>• **Share Action**: Opens Share modal (copy link, permissions).<br>• **Edit Route Return**: Accessing via `/search/:id/job-description` returns to `/search/:id/candidates` and triggers the stale banner if modified. |
| **4-Ideal profile** (Screenshot 2026-10-06 215602) | Step 3: Ideal Candidate Profile & Criteria | `/search/new/ideal-profile`<br>`/search/:id/ideal-profile` | • **Structured Profile**: Left pane copilot chat; right pane structured profile card.<br>• **Interactive Tag/Item Management**: Editable title with pencil icon; removable and addable tags across Domain Experience, Core Skills, Profile Titles, Evidences, and Qualifications.<br>• **Versioning (Frame 124)**: Version dropdown to revert changes.<br>• **Share Action**: Opens Share modal.<br>• **Save Draft**: Available on step.<br>• **Edit Route Return**: Accessing via `/search/:id/ideal-profile` returns to `/search/:id/candidates` and triggers the stale banner if modified. |
| **5-skill ranking** (Screenshot 2026-10-06 215612) | Step 4: Skill Ranking & Prioritization | `/search/new/skill-ranking`<br>`/search/:id/skill-ranking` | • **Ranked Lists**: "Must have" (primary match drivers) and "Nice to have" (tie-breakers) groups.<br>• **Interactive Reordering**: Up/Down reorder buttons + Drag & Drop handles; rank badges (1-6) update reactively; move items between groups.<br>• **Factor Types (Frame 125)**: Rankable factor types beyond skills: user can rank and promote Qualifications and Evidence factors.<br>• **Add Factor**: Modal to add custom skill, qualification, or evidence.<br>• **Reset Changes**: Restores AI's default proposed ranking order.<br>• **Live Re-sort**: When edited from `/search/:id/skill-ranking`, changes re-sort candidate list immediately and set the stale warning flag upon returning. |
| **6-search setup** (Screenshot 2026-10-06 215620) | Step 5: Search Configuration & Platforms | `/search/new/search-setup`<br>`/search/:id/search-settings` | • **Fit Strictness**: Interactive slider for Minimum % Fit (e.g. 70%).<br>• **Fit Explanation Modal (Frame 126)**: Clickable info icon triggering educational modal explaining the match formula and ranking weights.<br>• **Fictional Platforms Checklist**: Platform A, Platform B, Platform C, Platform D (Connected); Platform E (Access expired); Platform F (Not connected). Checkboxes to include/exclude.<br>• **Cadence Settings (Frame 127)**: "Run once now", "Run daily", "Run weekly" with stop conditions ("On role opening date" vs "When I stop it").<br>• **Summary Sidebar**: Live read-out of profile, JD, top skills, fit cutoff, and platforms.<br>• **Save Draft**: Available on step. |
| **6.1-searching** (Screenshot 2026-10-06 215626) | Step 5.1: Multi-Platform Search Execution | `/search/new/searching` | • **Live Search Simulation**: Overall progress bar with staged platform progression.<br>• **Platform Status Matrix**: Per-platform 3-stage progress (Searched → Analyzed → Candidates listed). Includes Done, Working (hourglass), and Failed (Frame 128: Platform D error state with Retry button).<br>• **Partial Results**: "Results so far (12 candidates)" with "View partial list" button.<br>• **Background Search**: "Leave and notify me" button returns to Dashboard while tracking progress; "Cancel search" aborts.<br>• **Fast-Forward**: Available in the Demo Controls drawer to instantly finish the search. |
| **7-candidates** (Screenshot 2026-10-06 215633) | Step 6: Candidates List & Shortlist Hub | `/search/:id/candidates` | • **Candidates List & Shortlisted Tabs**: Tab 1 shows all candidates (48); Tab 2 shows only shortlisted candidates (live badge counter).<br>• **Candidate Table**: Fictional candidate names and fictional research paper titles; match %, visual fit meter, "Why it matched" rationale, source tags (Platform A-D).<br>• **Actions**: Shortlist toggle (`+ Shortlist` / `✕ Remove`), reject candidate action.<br>• **Search Runs Filter**: Pills for "All candidates", "New since last run", "Run 3, today", "Run 2", "Run 1".<br>• **Sorting & Min Fit**: Sort by "Best fit", "Most recent", "Lowest fit"; min fit % input.<br>• **Pagination**: "Showing 5 of 48", `< 1 / 10 >` functional controls.<br>• **Candidate Deep-Dive Modal**: Clicking candidate row displays full breakdown.<br>• **Generic Source Preview (Frame 131)**: Clicking platform badge opens generic profile view modal (no real third-party site branding).<br>• **Search Settings Drawer (Frame 129)**: Modify cadence, platforms, or pause search.<br>• **Edit Quick Links (Frame 130)**: Direct buttons to edit Skill Ranking, Ideal Profile, or JD. |
| **8-settings changed case** (Screenshot 2026-10-06 215637) | Stale-Data / Ranking Changed Warning | `/search/:id/candidates` (stale state) | • **Stale Data Banner**: Alert banner informing user that ranking/settings changed and candidate pool requires a refresh.<br>• **Re-run Behavior**: Clicking "Re-run search 🔍" runs a simulation, adds new fictional candidates tagged "New", prepends a new run chip ("Run 4, today"), updates "New since last run" count, and dismisses the stale banner.<br>• **Dismiss Action**: Clears banner without re-running. |
| **Demo Controls Drawer** | Universal Reviewer Tooling | Accessible across all routes | • Discreet floating pill in bottom-right corner + keyboard shortcut (`Ctrl+Shift+D` or `Alt+D`).<br>• Instant jumps to any screen/state: Dashboard (normal, empty, background search), Wizard Steps 1–6, Edit routes, Platform D failure, Stale Warning, Fast-forward search, and Reset all state. |

---

## 2. Flow Map

```mermaid
flowchart TD
    Dash["1. Dashboard / Home (/dashboard)"]
    NewBtn["Click '+ New search'"]
    ExRole["Click existing search card"]
    ResumeDraft["Click 'Resume draft'"]
    
    Dash --> NewBtn --> Req["2. Role Requirement (/search/new/requirement)"]
    Dash --> ExRole --> CandList["6. Candidates Shortlist (/search/:id/candidates)"]
    Dash --> ResumeDraft --> Req
    
    Req -->|"Generate job description"| JD["3. Job Description (/search/new/job-description)"]
    JD -->|"Approve Job Description"| IP["4. Ideal Candidate Profile (/search/new/ideal-profile)"]
    IP -->|"Continue to skill ranking"| SR["5. Skill Ranking (/search/new/skill-ranking)"]
    SR -->|"Continue to search setup"| SS["6. Search Setup (/search/new/search-setup)"]
    
    SS -->|"Start searching"| Searching["7. Searching In-Progress (/search/new/searching)"]
    Searching -->|"Leave and notify me"| Dash
    Searching -->|"Search completes or 'View partial list'"| CandList
    
    subgraph Dedicated Edit Routes (/search/:id/...)
        CandList -->|"Click 'Skill ranking'"| EditSR["/search/:id/skill-ranking"]
        CandList -->|"Click 'Ideal profile'"| EditIP["/search/:id/ideal-profile"]
        CandList -->|"Click 'Job description'"| EditJD["/search/:id/job-description"]
        CandList -->|"Click Settings Gear"| EditSS["/search/:id/search-settings"]
        
        EditSR -->|"Save / Back (re-sorts immediately)"| StaleState["Candidates with Stale Banner (/search/:id/candidates)"]
        EditIP -->|"Save / Back"| StaleState
        EditJD -->|"Save / Back"| StaleState
        EditSS -->|"Save / Back"| StaleState
    end
    
    StaleState -->|"Click 'Re-run search'"| ReRunSim["Re-run Simulation"]
    ReRunSim -->|"Adds new candidates + new run chip"| CandList
```

---

## 3. Component Architecture & List

```
src/
├── components/
│   ├── ui/                         # Design system primitives (DESIGN.md tokens)
│   │   ├── Button.tsx              # White Pill CTA, Ghost Nav Button, Hairline Button, Icon Button
│   │   ├── Badge.tsx               # Status badges, Rank pills, AI tags
│   │   ├── Card.tsx                # Frosted glass panel, Elevated Graphite card
│   │   ├── Input.tsx               # Accessible dark input with white focus ring & dark offset
│   │   ├── Textarea.tsx            # Expandable dark textarea
│   │   ├── Slider.tsx              # Custom styled range slider for Fit %
│   │   ├── Modal.tsx               # Accessible dialog (focus trap, ESC dismiss, backdrop blur)
│   │   ├── Drawer.tsx              # Slide-over panel (accessible focus trap)
│   │   ├── Stepper.tsx             # 6-step progress navigation pills
│   │   └── Icons.tsx               # Monochrome SVG icons (no emoji, no generic placeholders)
│   ├── layout/
│   │   ├── AppShell.tsx            # Pure void canvas background (#0a0a0a), centered max-w-[1200px]
│   │   ├── Navigation.tsx          # Minimal top bar matching wireframes: "HR Platform" + User avatar
│   │   ├── UserMenuModal.tsx       # Minimal popover for avatar click
│   │   └── GlobalSettingsModal.tsx # Minimal platform connections & team settings
│   ├── wizard/
│   │   ├── Step1Requirement.tsx    # Vague input, file dropzone, opening date, role templates
│   │   ├── Step2JobDescription.tsx # Split layout: copilot chat + editable document + share modal
│   │   ├── Step3IdealProfile.tsx   # Split layout: copilot chat + interactive tag editor + share modal
│   │   ├── Step4SkillRanking.tsx   # Reorderable must-have / nice-to-have, factor types (skills, qualifications, evidences)
│   │   ├── Step5SearchSetup.tsx    # Fit slider, platform checklist, scheduling, summary card
│   │   └── Step5Searching.tsx      # Staged progress matrix, retry button, partial results trigger
│   ├── candidates/
│   │   ├── CandidateTable.tsx      # Candidates table with pagination, sort, % meter, badges
│   │   ├── ShortlistedTab.tsx      # Filtered view of shortlisted candidates with export action
│   │   ├── CandidateDetailDrawer.tsx # Deep-dive into candidate papers, code, match scores
│   │   ├── GenericPlatformPreview.tsx # Generic source profile modal (Platform A-D)
│   │   ├── SearchSettingsDrawer.tsx  # Search frequency, platforms, pause/resume search
│   │   ├── StaleWarningBanner.tsx    # Warning banner when ranking/setup changed
│   │   ├── FitExplainerModal.tsx     # Educational modal for % fit calculation math
│   │   └── ShareModal.tsx            # Shortlist sharing modal
│   └── demo/
│       └── DemoControlsDrawer.tsx  # Floating pill + Alt+D / Ctrl+Shift+D trigger with fast-forward
├── data/                           # Separate domain datasets (zero inline data in components)
│   ├── roles.ts                    # Pre-configured searches and initial drafts
│   ├── jobDescriptions.ts          # Fictional cross-disciplinary JD drafts (v1, v2)
│   ├── idealProfiles.ts            # Skills, domains, qualifications, evidences
│   ├── candidates.ts               # Fictional candidate pool (fictional names, research papers)
│   └── platforms.ts                # Platform connection states (Platform A to F)
├── context/
│   └── SearchWorkflowContext.tsx   # React state for current draft, wizard inputs, ranking, shortlist, versioned localStorage
├── styles/
│   └── index.css                   # Tailwind v4 theme definitions and font setups
└── App.tsx                         # Router and root providers
```

---

## 4. Design Token Mapping & Styling Rules (Attio Precision Digital Toolkit)

```css
@theme {
  /* Surfaces & Canvas */
  --color-white: #ffffff;
  --color-ash: #f3f4f6;
  --color-stone: #e4e7ec;
  --color-slate: #d3d8df;
  --color-lead: #b5bdc9;
  --color-overcast: #8f99a8;
  --color-metal: #6f7988;
  --color-carbon: #505967;
  --color-ink: #1c1d1f;
  --color-abyss: #000000;

  /* Accents & States */
  --color-action-blue: #407ff2;
  --color-focus-blue: #94b9ff;
  --color-success-green: #075a39;
  --color-danger-red: #b91c1c;
  --color-warning-yellow: #b45309;

  /* Typography */
  --font-serif: 'Newsreader', 'Lora', Georgia, serif;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* Type Scale */
  --text-caption: 12px;
  --text-body-sm: 13px;
  --text-body: 15px;
  --text-subheading: 18px;
  --text-heading-sm: 24px;
  --text-heading: 32px;
  --text-heading-lg: 40px;

  /* Border Radii */
  --radius-cards: 8px;
  --radius-inputs: 8px;
  --radius-buttons: 10px;
  --radius-badges: 6px;
  --radius-pills: 9999px;

  /* Shadows */
  --shadow-ui-frame-card: rgba(28, 40, 64, 0.08) 0px 2px 4px -2px, rgba(28, 40, 64, 0.04) 0px 4px 6px -2px;
  --shadow-modal: rgba(28, 40, 64, 0.15) 0px 12px 32px -4px;
}
```

### Strict Styling Rules
- **Editorial Light Canvas**: Crisp white `#ffffff` and subtle off-white `#fafbfc` background with stone borders.
- **Typographic Duality**: Display headlines and generated artifact titles in soft serif `Newsreader`; UI buttons, tables, navigation, inputs in `Inter`.
- **Button Geometry**: Strictly `10px` radius (`rounded-[10px]`) with solid Ink `#1c1d1f` primary fill.
- **Card Geometry**: Strictly `8px` radius (`rounded-[8px]`) with 1px stone borders `#e4e7ec` and subtle card elevation shadows.
- **Focus Ring**: `focus-visible:outline-2 focus-visible:outline-[#407ff2] focus-visible:outline-offset-2`.
- **Navigation Chrome**: Top bar contains strictly "HR Platform" on the left and the user avatar on the right, matching the wireframes.

---

## 5. Smallest Sensible Behavior for Undrawn Elements (Assumptions)

1. **Avatar Menu**: Clicking the top-right avatar displays a compact menu popover showing the current user ("Akarshan / Lead Talent Partner"), an active workspace indicator, a link to Global Settings, and a simulated "Sign out" action.
2. **Global Settings**: Clicking "Manage connections in global settings" (from Step 5 or candidate settings) opens a modal showing the status of Platform A through F with options to reconnect expired platforms (Platform E) or connect new ones (Platform F).
3. **Dashboard CTA Banners (Frame 115)**:
   - Banner 1: "Automated Search Pipelines" ("3 scheduled searches running weekly. 14 new candidates discovered across platforms.") with a primary button "[Manage schedules]" (opens a scheduling summary) and secondary button "[Pause all]".
   - Banner 2: "Platform Connections" ("4 of 6 platforms connected. Platform E access token requires renewal.") with a primary button "[Reconnect Platform E]" and secondary button "[View all connections]".
4. **"View All" Job Descriptions (Frame 117)**: Opens a compact modal listing all archived and active job descriptions with search filtering, allowing the user to select any previous role to prefill Step 1.
5. **Share Flows (Step 2, Step 3, Step 6)**: Clicking "Share" opens a modal displaying a generated shareable link with an instant "Copy Link" button (shows copy confirmation toast) and a read-only permissions toggle.
6. **Generic Platform Source Preview (Frame 131)**: Clicking a candidate's platform chip (e.g. `Platform A ↗`) opens a generic, cleanly styled candidate profile sheet showing verification timestamps, source repository link, and raw candidate profile data—without imitating real third-party brands.

---

## 6. Execution Order

1. **Scaffolding & Configuration**:
   - Initialize Vite, React 19, TypeScript, Tailwind v4, React Router v7.
   - Setup static SPA fallback (`_redirects` and fallback routing).
   - Setup versioned `localStorage` provider (`niche_hr_prototype_v1`).
2. **Data Layer**:
   - Fictional candidates (48 records with fictional names and research publications).
   - Fictional job descriptions, ideal profiles, and platform states (Platform A to F).
3. **Design Tokens & Primitives**:
   - Implement `Button`, `Card`, `Badge`, `Input`, `Slider`, `Modal`, `Drawer`, `Stepper`, `Icons`.
4. **App Shell & Flow Screens**:
   - Dashboard with search cards, drafts, resume button, and CTA banners.
   - Step 1: Role Requirement with file upload and template selection.
   - Step 2: Job Description with inline edit, copilot chat, section triggers, versioning, and share modal.
   - Step 3: Ideal Profile with interactive tag management, versioning, and share modal.
   - Step 4: Skill Ranking with reordering, multiple factor types (skills, qualifications, evidences), and custom add.
   - Step 5: Search Setup with fit slider, explainer modal, platform toggles, and cadence.
   - Step 5.1: Searching screen with staged progress, Platform D failure retry, and background option.
   - Step 6: Candidates screen with Candidates and Shortlisted tabs, pagination, sorting, detail drawer, and generic source preview.
   - Edit routes (`/search/:id/job-description`, `/search/:id/ideal-profile`, `/search/:id/skill-ranking`, `/search/:id/search-settings`) returning to candidates with the Stale Warning banner.
   - Re-run search flow adding new fictional candidates and new run chip.
5. **Universal Demo Controls Drawer**:
   - Floating pill in bottom-right + `Alt+D` / `Ctrl+Shift+D` shortcut.
   - Quick jump to every screen, state, error, stale banner, and fast-forward search.
6. **Playwright Visual Verification**:
   - Run Playwright test script to screenshot all screens and key states.
   - Verify fidelity against wireframes and DESIGN.md.
7. **Documentation**:
   - Create `CLAUDE.md`.
   - Create `README.md` documenting setup, architecture, demo controls, and deviations.

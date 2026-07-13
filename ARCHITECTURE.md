# PropEdge — Architecture & Walkthrough

## 1. Project Overview

**PropEdge** is a fully client-side real estate listing web application targeting the Mexican property market. It is written in React 19, bundled with Vite 8, and hosted as a static site on AWS S3. There is no backend server — all data is hardcoded at build time and all user-submitted forms are exported locally as CSV files.

---

## 2. Technology Stack

| Layer | Technology | Version |
|---|---|---|
| UI framework | React | 19.x |
| Bundler | Vite | 8.x |
| Linter | oxlint | 1.x |
| Hosting | AWS S3 Static Website | — |
| CI/CD | GitHub Actions | — |
| Source control | Git / GitHub | — |

---

## 3. Repository Layout

```
PropEdge-React-Project/
├── src/
│   ├── App.jsx          # Entire application: components, state, logic
│   ├── App.css          # All styles (layout, header, cards, forms, responsive)
│   ├── index.css        # Base / reset styles
│   ├── main.jsx         # React DOM entry point
│   └── assets/          # Static assets imported by components
├── public/              # Files copied verbatim to dist/ (favicon, etc.)
├── index.html           # Vite HTML template — single entry point
├── vite.config.js       # Vite configuration (React plugin)
├── package.json         # Scripts and dependencies
├── .gitignore           # Ignored paths (node_modules, dist, etc.)
├── deploy.ps1           # Manual PowerShell deployment script to S3
├── .github/
│   └── workflows/
│       └── deploy.yml   # CI/CD: build + push to S3 on every main push
└── dist/                # Vite build output (not committed)
```

---

## 4. Architecture

### 4.1 Component Model

The entire UI lives in a **single component file** (`src/App.jsx`). The file is structured into logical sections rather than separate component files, keeping the project simple for a demo/prototype:

```
App.jsx
├── Data layer
│   ├── photos[]          — Unsplash CDN image URLs
│   ├── properties[]      — 6 hardcoded property objects
│   └── translations{}    — Bilingual string map (es / en)
│
├── App() — root component
│   ├── State
│   │   ├── lang          — 'es' | 'en'  (language toggle)
│   │   ├── query         — search input value
│   │   ├── submitted     — last executed search term
│   │   ├── saved[]       — array of saved property IDs
│   │   ├── activeTab     — 'buy' | 'rent' | 'sell'  (header nav)
│   │   ├── menuOpen      — mobile hamburger toggle
│   │   ├── selected      — currently viewed property (detail view)
│   │   ├── leadMode      — 'sell' | 'buy'  (contact form toggle)
│   │   └── form data     — controlled inputs for agent/lead forms
│   │
│   ├── Derived state
│   │   └── filtered[]    — useMemo: properties filtered by search query
│   │
│   └── Rendered sections
│       ├── <header>      — Logo, nav tabs, language toggle, hamburger, Get Started
│       ├── <hero>        — Headline, search bar
│       ├── <listings>    — Property cards grid (or detail view when selected)
│       ├── <cta>         — "Sell or Buy" section with dual-mode lead form
│       ├── <agent-form>  — Contact / advisor form
│       └── <footer>      — Branding line
```

### 4.2 Data Flow

```
User interaction
      │
      ▼
  React state (useState / useMemo)
      │
      ▼
  Re-render → UI update (no API calls, no Redux, no context)
      │
  Form submit
      ▼
  CSV Blob → URL.createObjectURL → browser download
```

All state is local to the `App` component. There is no external state management library, no API, and no database.

### 4.3 Styling

All styles are in `src/App.css` using plain CSS (no CSS modules, no Tailwind). Key patterns:

- **Header**: flexbox row with `.header-actions` pushed to the right via `margin-left: auto`.
- **Cards**: CSS Grid with `repeat(auto-fill, minmax(320px, 1fr))` for responsive columns.
- **Forms**: centered with `max-width` and `margin: auto`.
- **Responsive**: `@media (max-width: 768px)` breakpoints collapse the header, hide desktop nav links, and stack the layout vertically.

### 4.4 Internationalisation

A `translations` object holds two keys — `es` (Spanish) and `en` (English). All UI strings are looked up via `t = translations[lang]`. A toggle button in the header switches the `lang` state, instantly re-rendering all text.

---

## 5. Build & Run

### Local development

```bash
npm install
npm run dev          # starts Vite dev server on http://localhost:5173
```

### Production build

```bash
npm run build        # outputs to dist/
npm run preview      # serves dist/ locally for final check
```

---

## 6. Deployment

### 6.1 Infrastructure

The built `dist/` folder is hosted as a **static website on AWS S3**:

| Setting | Value |
|---|---|
| Bucket name | `real-estate-react-project` |
| Region | `ap-southeast-2` (Sydney) |
| Website endpoint | `http://real-estate-react-project.s3-website.ap-southeast-2.amazonaws.com` |
| Index document | `index.html` |
| Error document | `index.html` (handles client-side routing) |

The bucket has **public access enabled** and a **public-read bucket policy** so any browser can fetch the static files.

### 6.2 Manual Deployment (PowerShell)

```powershell
# Requires AWS CLI configured with valid credentials
./deploy.ps1
```

The script runs `npm run build` and then `aws s3 sync ./dist s3://real-estate-react-project --delete`.

### 6.3 Automated Deployment (GitHub Actions)

Every push to the `main` branch triggers `.github/workflows/deploy.yml`:

```
push to main
    │
    ▼
GitHub Actions runner (ubuntu-latest)
    ├── Checkout code
    ├── Setup Node 20
    ├── npm ci
    ├── npm run build
    └── aws s3 sync dist/ → s3://real-estate-react-project
```

Required GitHub repository secrets:

| Secret | Purpose |
|---|---|
| `AWS_ACCESS_KEY_ID` | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret |
| `AWS_REGION` | `ap-southeast-2` |

---

## 7. Feature Walkthrough

### 7.1 Search

The search bar in the hero section filters the `properties[]` array by matching the query string against `address`, `city`, or `type` fields (case-insensitive). Results update only when the user submits (presses Enter or clicks Search). The filter is computed with `useMemo` so it only recalculates when `submitted` or `lang` changes.

### 7.2 Property Cards

Each card shows:
- Listing photo (Unsplash CDN)
- Price, address, city
- Beds / baths / area stats
- Rating and review count
- A **Save** toggle that adds/removes the property ID from the `saved[]` array
- A **View details** link that sets `selected` state and renders the detail panel

### 7.3 Property Detail View

Clicking a card replaces the grid with a full-width detail view showing:
- Full-size hero image
- All property metadata
- An advisor sidebar with a **Schedule a visit** form
- A back button to return to the listing grid

### 7.4 Lead Forms (Sell / Buy)

The CTA section below the listing grid shows a two-tab form:

- **Sell tab**: collects owner details + property details and downloads a CSV on submit.
- **Buy tab**: collects buyer preferences and downloads a CSV on submit.

Both forms use controlled inputs and reset after submission.

### 7.5 Agent Contact Form

A fixed contact form section allows visitors to leave their name, email, phone, preferred area, and notes. On submit, the data is exported as a CSV download using the browser's `Blob` + `URL.createObjectURL` API.

### 7.6 Language Toggle

The globe/flag button in the header switches between Spanish (`es`) and English (`en`). All labels, placeholders, headings, and button text update instantly with no page reload.

### 7.7 Mobile Navigation

On screens narrower than 768 px:
- Desktop nav links are hidden.
- A hamburger menu button (`☰`) appears and toggles a vertical dropdown menu with the same nav links.

---

## 8. Known Limitations / Future Work

| Area | Current state | Suggested improvement |
|---|---|---|
| Data | Hardcoded in JS | Replace with a headless CMS or REST API |
| Forms | CSV download only | Connect to a backend / email service |
| Auth | None | Add agent login with AWS Cognito |
| Routing | Single-page, state-based | Migrate to React Router for shareable URLs |
| Images | External CDN (Unsplash) | Self-host in S3 for reliability |
| HTTPS | HTTP only (S3 endpoint) | Add CloudFront distribution for TLS + CDN |
| Search | Client-side filter | Add server-side search (e.g. Algolia) |

---


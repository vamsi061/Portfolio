# Guru Vamsi — Portfolio

Personal portfolio of **Guru Vamsi**, Software Developer (Backend) — showcasing REST API & messaging work, projects, certifications and more.

**Live:** https://vamsi061.github.io/Portfolio/

## ✨ Features

- **Modern dark-first design** with light mode toggle — indigo→violet gradient accent system
- **5 accent color themes** (Violet, Ocean, Emerald, Sunset, Rose) via the floating palette picker — saved in `localStorage`, applied before first paint
- **Custom scrollspy** navigation with smooth section tracking
- **Categorized skills**: Languages · Backend & Integration · DevOps & Quality · AI Tools & Workflow (Claude Code, OpenCode, Copilot, Ollama, Hugging Face)
- **Experience & Education timelines** with company branding and academic score badges
- **Auto-scrolling certification rows** (seamless CSS marquee, pause on hover, faded edges):
  - **Credly** — fetched live via CORS proxy, static fallback included (18 badges)
  - **Google Developers** — 7 badges
  - **Salesforce Trailhead** — 52 earned awards (13 Superbadges, 31 Modules, 6 Projects, 2 Badges), synced from the Trailhead GraphQL API
- **Clickable provider pills** linking to each badge profile (Credly, g.dev, Trailblazer)
- **Contact form** powered by [Web3Forms](https://web3forms.com/) with honeypot spam protection
- **SEO ready**: JSON-LD Person schema, Open Graph / Twitter cards, canonical URL, robots.txt
- **AI assistant ("Vamsi Bot")** — Mistral-powered chat that answers only portfolio questions, sends email via Web3Forms, navigates sections and switches themes on request
- **Token-saving response cache** — repeated questions are served from `localStorage` (7-day TTL, 40 entries) instead of hitting the API again
- **Accessible & responsive** — keyboard-friendly picker, reduced-motion support, mobile offcanvas nav, keyboard-aware chat panel (Visual Viewport API), no horizontal overflow on small screens

## 🗂 Project Structure

```
├── index.html          # Single-page portfolio
├── css/
│   ├── style.css       # Design system (themes, sections, components)
│   ├── bootstrap.min.css
│   ├── bootstrap-icons.min.css
│   └── aos.css         # Scroll animations
├── js/
│   ├── script.js       # Vanilla JS — theme, scrollspy, badges, particles
│   ├── chatbot-data.js # Bot config + portfolio knowledge base
│   ├── chatbot.js      # Vamsi Bot UI, Mistral calls, actions, cache
│   ├── bootstrap.min.js
│   └── aos.js
├── css/
│   └── ... (+ chatbot.css widget styles)
├── images/
│   ├── opt/            # Optimized project banners (~370KB total)
│   └── skills/         # Brand logos (simple-icons)
├── .github/workflows/
│   └── deploy.yml      # Injects MISTRAL_API_KEY secret, publishes gh-pages
└── Resume.pdf
```

No build step. No jQuery. Plain HTML/CSS/JS + Bootstrap 5.

## 🚀 Run Locally

Any static server works:

```bash
python3 -m http.server 8000
# or: npx serve .
```

Then open http://localhost:8000

## 🎨 Customization

| What | Where |
|------|-------|
| Accent colors | `THEME_COLORS` in `js/script.js` + swatch styles in `index.html` |
| Typing roles | `strings` array in `js/script.js` |
| Projects | `#projects` section in `index.html` |
| Credly fallback badges | `fallbackBadges` in `js/script.js` (live list auto-fetches via CORS proxy) |
| Trailhead badges | `trailblazerBadges` snapshot in `js/script.js` — re-sync after earning new badges |
| Contact form key | Web3Forms `access_key` in `index.html` |
| Chatbot knowledge | `PORTFOLIO_KNOWLEDGE` in `js/chatbot-data.js` (live skills/projects/badges auto-read from the page) |
| Chatbot models | `models` array in `js/chatbot-data.js` (Mistral fallback chain) |

### 🔄 Re-syncing Trailhead badges

Salesforce's API blocks browser calls (CORS), so badges are embedded as a snapshot. To refresh:

```bash
curl -s -X POST "https://profile.api.trailhead.com/graphql" \
  -H "Content-Type: application/json" \
  -d '{"query":"query { profile(slug: \"guruvamsikallepalli\") { ... on PublicProfile { earnedAwards(first: 100) { edges { node { ... on EarnedAwardBase { award { title type icon content { webUrl } } } } } } } } }"}' \
  > /tmp/tb.json
# then update the trailblazerBadges array in js/script.js from the response
```

## 🤖 Chatbot setup

The assistant's key never lives in the repo — it is injected at deploy time.

1. Add a repo secret named **`MISTRAL_API_KEY`** (Settings → Secrets and variables → Actions)
2. Settings → Pages → Source: **Deploy from a branch** → branch **`gh-pages`** /(root)
3. Push to `main` — the workflow replaces the key placeholder, publishes to `gh-pages`, done

Notes:
- On localhost the bot shows a "not configured" notice (expected — secrets only exist in CI)
- Repeated questions are answered from a local cache, so you don't burn tokens

## 📦 Deployment

GitHub Pages deploys via Actions to the `gh-pages` branch:

```bash
git push origin main   # workflow injects secret → publishes gh-pages
```

---

© Guru Vamsi · Built with HTML, CSS & JavaScript

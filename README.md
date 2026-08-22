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
- **Accessible & responsive** — keyboard-friendly picker, reduced-motion support, mobile offcanvas nav, no horizontal overflow on small screens

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
│   ├── bootstrap.min.js
│   └── aos.js
├── images/
│   ├── opt/            # Optimized project banners (~370KB total)
│   └── skills/         # Brand logos (simple-icons)
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

### 🔄 Re-syncing Trailhead badges

Salesforce's API blocks browser calls (CORS), so badges are embedded as a snapshot. To refresh:

```bash
curl -s -X POST "https://profile.api.trailhead.com/graphql" \
  -H "Content-Type: application/json" \
  -d '{"query":"query { profile(slug: \"guruvamsikallepalli\") { ... on PublicProfile { earnedAwards(first: 100) { edges { node { ... on EarnedAwardBase { award { title type icon content { webUrl } } } } } } } } }"}' \
  > /tmp/tb.json
# then update the trailblazerBadges array in js/script.js from the response
```

## 📦 Deployment

GitHub Pages serves from `main`. Push to deploy:

```bash
git push origin main
```

---

© Guru Vamsi · Built with HTML, CSS & JavaScript

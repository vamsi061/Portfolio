# Guru Vamsi — Portfolio

Personal portfolio of **Guru Vamsi**, Software Developer (Backend) — showcasing REST API & messaging work, projects, certifications and more.

**Live:** https://vamsi061.github.io/Portfolio/

## ✨ Features

- **Modern dark-first design** with light mode toggle — indigo→violet gradient accent system
- **5 accent color themes** (Violet, Ocean, Emerald, Sunset, Rose) via the floating palette picker — saved in `localStorage`, applied before first paint
- **Custom scrollspy** navigation with smooth section tracking
- **Categorized skills**: Languages · Backend & Integration · DevOps & Quality · AI Tools & Workflow (Claude Code, OpenCode, Copilot, Ollama, Hugging Face)
- **Experience & Education timelines** with company branding and academic score badges
- **Live Credly badges** fetched dynamically (with offline fallback data)
- **Contact form** powered by [Web3Forms](https://web3forms.com/)
- **SEO ready**: JSON-LD Person schema, Open Graph / Twitter cards, canonical URL, robots.txt
- **Accessible & responsive** — keyboard-friendly picker, reduced-motion support, mobile offcanvas nav

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
| Credly fallback badges | `fallbackBadges` in `js/script.js` |
| Contact form key | Web3Forms `access_key` in `index.html` |

## 📦 Deployment

GitHub Pages serves from `main`. Push to deploy:

```bash
git push origin main
```

---

© Guru Vamsi · Built with HTML, CSS & JavaScript

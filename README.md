# Mohamed Waleed — Portfolio

Personal portfolio website for **Mohamed Waleed Roshdy**, a Flutter developer based in Cairo. The site presents experience, skills, education, courses, and contact information in a single-page layout with a dark theme and responsive design.

## Features

- **Responsive layout** — Bootstrap 5 with a custom dark theme and typography (Playfair Display, DM Sans, DM Mono).
- **Smooth UX** — Scroll-based fade-in animations, mobile navigation collapse, and active section highlighting in the navbar.
- **Accessible basics** — Semantic structure, skip-friendly navigation patterns, and theme color meta for mobile browsers.

## Tech stack

| Area          | Details                                      |
| ------------- | -------------------------------------------- |
| Markup        | HTML5                                        |
| Styling       | Bootstrap 5.3, custom CSS (`css/custom.css`) |
| Interactivity | Vanilla JavaScript (`js/main.js`)            |
| Fonts         | Google Fonts (loaded via CDN)                |

## Project structure

```
mohamed waleed portfolio/
├── index.html      # Main page and content
├── css/
│   └── custom.css  # Theme, layout, and component styles
├── js/
│   └── main.js     # Animations, nav behavior, scroll spy
└── images/         # Asset images
```

## Deployment

Static site with no build step: push this repo to GitHub and enable **GitHub Pages** (Settings → Pages) using the branch and folder that contain `index.html` at the repository root. Keep paths to `css/`, `js/`, and `images/` relative so assets load correctly.

---

© Mohamed Waleed Roshdy. All rights reserved.

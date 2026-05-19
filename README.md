# Yevheniia Chumak — QA Consultant Site

Static portfolio site for an independent QA consultant. Hosted on GitHub Pages with no build step.

## Project structure

```
├── index.html          # Main page
├── css/styles.css      # Styles
├── js/
│   ├── i18n.js         # EN / RU / UK language switching
│   └── main.js         # Mobile nav, contact form
├── locales/
│   ├── en.json
│   ├── ru.json
│   └── uk.json
├── img/
│   ├── backgrnd.png      # Site background (translucent overlay in CSS)
│   └── linkedphoto.jpeg  # Profile photo
└── .nojekyll           # Disables Jekyll processing on GitHub Pages
```

## Local preview

Locale files are loaded via `fetch()`, so you must use a local server (opening `index.html` directly will not work).

```bash
cd /path/to/qa-mvp
python3 -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080).

## Deploy to GitHub Pages

1. Create a repository on GitHub (e.g. `qa-mvp`).
2. Push this folder to the `main` branch.
3. In the repo: **Settings → Pages → Build and deployment**
   - **Source:** Deploy from a branch
   - **Branch:** `main` / `/ (root)`
4. Wait a few minutes. The site will be at:
   - **Project site:** `https://<username>.github.io/qa-mvp/`
   - **User site** (repo named `<username>.github.io`): `https://<username>.github.io/`

### Project site (subpath) notes

If the site is served from `https://<username>.github.io/qa-mvp/`, relative paths (`css/`, `locales/`, `js/`) work as-is. Update the `og:url` meta tag in `index.html` with your real URL.

## Contact form

The form uses a `mailto:` fallback (opens the user’s email client with a pre-filled message). For a serverless inbox, consider [Formspree](https://formspree.io):

```html
<form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

## Editing translations

All user-visible text lives in `locales/en.json`, `locales/ru.json`, and `locales/uk.json`. Keys use dot notation (e.g. `hero.title`). Match keys across all three files.

## License

Personal portfolio — all rights reserved unless you add a license file.

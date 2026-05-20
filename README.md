# Yevheniia Chumak — QA Consultant Site

Static portfolio site for an independent QA consultant. Hosted on GitHub Pages with no build steps.

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
│   ├── mvplogo.svg           # Logo (nav + SVG favicon)
│   ├── favicon-32.png        # PNG favicon (32×32)
│   ├── apple-touch-icon.png  # iOS home screen (180×180)
│   ├── backgrnd.png          # Site background (translucent overlay in CSS)
│   ├── linkedphoto.jpeg      # Profile photo
│   ├── safe_popm.png         # SAFe AI PO/PM badge
│   ├── ready_safe.png        # Ready for SAFe badge
│   ├── safe_5.png            # SAFe 5 Practitioner badge
│   ├── patsi.png             # IBM Planning Analytics Intermediate badge
│   └── pasf.png              # IBM Planning Analytics Foundation badge
└── .nojekyll           # Disables Jekyll processing on GitHub Pages
```

## Contact form

Submissions go to [Formspree](https://formspree.io). After a successful send, visitors return to `#contact` with a translated success message.

## Certifications

- **Ready for SAFe®** — Credly verify link is live in `index.html`.
- **Certified SAFe® 5 Practitioner (SP)** — verify link is a placeholder (`data-credly-placeholder="true"`). Replace `href="#"` on that card with your Credly public URL and remove the placeholder class when ready.

## Editing translations

All user-visible text lives in `locales/en.json`, `locales/ru.json`, and `locales/uk.json`. Keys use dot notation (e.g. `hero.title`). Match keys across all three files.

## License

Personal portfolio — all rights reserved unless you add a license file.
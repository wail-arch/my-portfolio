# My Portfolio

My Personal portfolio, built as a static bilingual HTML page.

The site presents my digital project management work through a timeline, case studies, tools, and contact information. It is designed to stay lightweight, readable, and easy to host on GitHub Pages.

## Preview locally

Open `index.html` directly in your browser.

No build step is required.

## Reuse

You are welcome to reuse the structure, layout ideas, and code patterns to build your own portfolio.

Please do not reuse my personal content, CV, portrait, company logos, case study copy, or any asset that represents my profile or past work. Company logos remain the property of their respective owners.

If you adapt this portfolio, replace the content, imagery, links, and project details with your own.

## Notes

- Static HTML, CSS, and JavaScript: `index.html`, `assets/site.css`, `assets/site.js`.
- No web fonts, no framework, no trackers. Around 90 KB loaded on first visit.
- French and English content sit side by side in the markup (`data-l="fr"` / `data-l="en"`); the script only switches which one is shown. Add `?lang=en` to a link to share the English version.
- The career section is a Gantt chart built from `<details>` rows: each bar is positioned with `--s` (start) and `--e` (end) in decimal years.
- Light and dark themes follow the operating system.
- Works without JavaScript; the script adds the language switch, the "today" marker and the live page weight in the footer.
- Built for simple deployment on GitHub Pages.
